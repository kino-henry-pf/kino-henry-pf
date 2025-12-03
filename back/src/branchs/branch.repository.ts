import { InjectRepository } from "@nestjs/typeorm";
import { Branch } from "./branch.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { GoogleMapsService } from "src/google-maps/google-maps.service";
import { UpdateBranchLocationDto } from "./dto/branch-location.dto";



@Injectable()
export class BranchRepository {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>,
        private googleMapsService: GoogleMapsService)  {}

    async findAll(){
        return await this.branchRepository.find()
    }
    
    async findBranchesByPartialAddress(search: string): Promise<Branch[]> {
    const addressKeywords = search
    .split(' ')
    .map(word => word.trim())
    .filter(word => word.length > 0);

    let query = this.branchRepository.createQueryBuilder('branch');

    addressKeywords.forEach((keyword, index) => {
    query = query.orWhere(`branch.address ILIKE :keyword${index}`, {
      [`keyword${index}`]: `%${keyword}%`,
    });
  });

    const Branches = await query.getMany();

    return Branches
}

    async findById(id: string): Promise<Branch>{
        const findBranch = await this.branchRepository.findOneBy({id})
        if(!findBranch) throw new NotFoundException(`Sucursal con id ${id} no fue encontrada`)

        return findBranch
    }

    async createBranch(branch: CreateBranchDto): Promise<Branch>{
        const newBranch = this.branchRepository.create({
            name: branch.name,
            address: branch.address,
            latitude: branch.latitude,
            longitude: branch.longitude,
            googlePlaceId: branch.googlePlaceId
        })

        return await this.branchRepository.save(newBranch)

    }

    async updateBranch(id: string, branch: UpdateBranchDto): Promise<Branch>{
        await this.findById(id); // asegura que existe
        await this.branchRepository.update(id, branch);
        const updatedBranch = await this.branchRepository.findOneBy({ id });

        if (!updatedBranch) {
        throw new BadRequestException(`Error al actualizar la sucursal con id ${id}`);
        }

        return updatedBranch;
        
    }

    async deleteBranch(id: string):Promise<string>{
        await this.findById(id)
        await this.branchRepository.delete({id})
        return `Sucursal con id ${id} ha sido eliminada exitosamente`

    }

    async linkGooglePlace(branchId: string, googlePlaceId: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id: branchId },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${branchId} not found`);
    }

    try {
      // Obtener detalles del lugar desde Google Maps
      const placeDetails = await this.googleMapsService.getPlaceDetails(googlePlaceId);

      // Actualizar sucursal con la información de Google Maps
      branch.googlePlaceId = placeDetails.placeId;
      branch.latitude = placeDetails.latitude;
      branch.longitude = placeDetails.longitude;
      branch.address = placeDetails.formattedAddress;

      await this.branchRepository.save(branch);

      console.log(`Branch ${branchId} linked to Google Place ${googlePlaceId}`);

      return branch;
    } catch (error) {
      console.error(`Error linking Google Place: ${error.message}`);
      throw new BadRequestException('Failed to link Google Place ID');
    }
  }

  /**
   * Actualiza la ubicación de una sucursal
   */
  async updateLocation(
    branchId: string,
    locationDto: UpdateBranchLocationDto,
  ): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id: branchId },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${branchId} not found`);
    }

    // Si se proporciona un Place ID, obtener datos completos
    if (locationDto.googlePlaceId) {
      try {
        const placeDetails = await this.googleMapsService.getPlaceDetails(
          locationDto.googlePlaceId,
        );

        branch.googlePlaceId = placeDetails.placeId;
        branch.latitude = placeDetails.latitude;
        branch.longitude = placeDetails.longitude;
        branch.address = placeDetails.formattedAddress;
      } catch (error) {
        throw new BadRequestException('Invalid Google Place ID');
      }
    } else {
      // Actualizar campos individuales
      if (locationDto.latitude !== undefined) {
        branch.latitude = locationDto.latitude;
      }
      if (locationDto.longitude !== undefined) {
        branch.longitude = locationDto.longitude;
      }
      if (locationDto.address !== undefined) {
        branch.address = locationDto.address;
      }
    }

    return await this.branchRepository.save(branch);
  }

  /**
   * Geocodifica la dirección de una sucursal y actualiza sus coordenadas
   */
  async geocodeBranchAddress(branchId: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id: branchId },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${branchId} not found`);
    }

    if (!branch.address) {
      throw new BadRequestException('Branch does not have an address');
    }

    try {
      const geocodeResult = await this.googleMapsService.geocodeAddress(
        branch.address,
      );

      branch.latitude = geocodeResult.latitude;
      branch.longitude = geocodeResult.longitude;
      branch.googlePlaceId = geocodeResult.placeId;
      branch.address = geocodeResult.formattedAddress;

      await this.branchRepository.save(branch);

      console.log(`Branch ${branchId} geocoded successfully`);

      return branch;
    } catch (error) {
      throw new BadRequestException('Failed to geocode branch address');
    }
  }

  /**
   * Encuentra sucursales cercanas a una ubicación
   */
  async findNearbyBranches(
    latitude: number,
    longitude: number,
    maxDistance: number = 10,
  ) {
    const branches = await this.branchRepository.find({
      select: ['id', 'name', 'address', 'latitude', 'longitude', 'googlePlaceId'],
    });

    const branchesWithDistance = branches
      .map((branch) => {
        const distance = this.googleMapsService.calculateDistance(
          latitude,
          longitude,
          branch.latitude,
          branch.longitude,
        );

        return {
          ...branch,
          distance: Math.round(distance * 100) / 100, // Redondear a 2 decimales
        };
      })
      .filter((branch) => branch.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    return branchesWithDistance;
  }

  /**
   * Obtiene los detalles de Google Maps de una sucursal
   */
  async getBranchGoogleDetails(branchId: string) {
    const branch = await this.branchRepository.findOne({
      where: { id: branchId },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${branchId} not found`);
    }

    if (!branch.googlePlaceId) {
      throw new BadRequestException('Branch does not have a Google Place ID');
    }

    try {
      const placeDetails = await this.googleMapsService.getPlaceDetails(
        branch.googlePlaceId,
      );

      return {
        branch: {
          id: branch.id,
          name: branch.name,
          address: branch.address,
        },
        googleDetails: placeDetails,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch Google Place details');
    }
  }

  /**
   * Obtiene la URL de Google Maps para una sucursal
   */
  getGoogleMapsUrl(branch: Branch): string {
    if (branch.googlePlaceId) {
      return `https://www.google.com/maps/place/?q=place_id:${branch.googlePlaceId}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`;
  }
}


  