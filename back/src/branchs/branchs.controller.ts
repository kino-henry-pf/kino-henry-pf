import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BranchService } from './branchs.service';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleMapsService } from '../google-maps/google-maps.service';
import {
  FindNearbyBranchesDto,
  GeocodeAddressDto,
  SearchPlacesDto,
  SetPlaceIdDto,
  UpdateBranchLocationDto,
} from './dto/branch-location.dto';
@Controller('branches')
@ApiTags('branches (Sucursales)')
@Controller('branches')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  @ApiOperation({ summary: 'Obtener todas las sucursales registradas' })
  @Get()
  findAll(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener sucursales por busqueda parcial de su dirección',
    description:
      'Este endpoint retorna una o mas sucursales que coincidan total o parcialmente entre su dirección registrada y la busqueda realizada',
  })
  @Get('search')
  findByPartialAddress(@Query('q') search: string): Promise<Branch[]> {
    return this.branchService.findBranchesByPartialAddress(search);
  }

  @ApiOperation({ summary: 'Obtener una sucursal por su UUID' })
  @Get(':id')
  findById(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findById(id);
  }

  @ApiOperation({ summary: 'Registrar una nueva sucursal' })
  @Post()
  createBranch(@Body() dto: CreateBranchDto): Promise<Branch> {
    return this.branchService.createBranch(dto);
  }

  @ApiOperation({
    summary: 'Actualizar una o varias propiedades de una sucursal registrada',
  })
  @Patch(':id')
  updateBranch(
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,
  ): Promise<Branch> {
    return this.branchService.updateBranch(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una sucursal a traves de su UUID' })
  @Delete(':id')
  deleteBranch(@Param('id') id: string): Promise<string> {
    return this.branchService.deleteBranch(id);
  }

  // ========== Búsqueda de lugares en Google Maps con su direccion escrita ==========

  @Get('google-maps/search')
  @ApiOperation({ summary: 'Search places on Google Maps' })
  @ApiResponse({
    status: 200,
    description: 'List of places found',
  })
  async searchPlaces(@Query() searchDto: SearchPlacesDto) {
    const location =
      searchDto.lat && searchDto.lng
        ? { lat: searchDto.lat, lng: searchDto.lng }
        : undefined;

    return await this.googleMapsService.searchPlaces(searchDto.query, location);
  }

  @Post('google-maps/geocode')
  @ApiOperation({ summary: 'Geocode an address to coordinates' })
  @ApiResponse({
    status: 200,
    description: 'Address geocoded successfully',
  })
  async geocodeAddress(@Body() geocodeDto: GeocodeAddressDto) {
    return await this.googleMapsService.geocodeAddress(geocodeDto.address);
  }

  // ========== Gestión de ubicación de sucursales ==========

  @Patch(':id/location')
  @ApiOperation({ summary: 'Update branch location' })
  @ApiResponse({
    status: 200,
    description: 'Branch location updated successfully',
  })
  async updateBranchLocation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() locationDto: UpdateBranchLocationDto,
  ) {
    return await this.branchService.updateLocation(id, locationDto);
  }

  @Put(':id/google-place')
  @ApiOperation({
    summary: 'Link a Google Place ID to a branch',
    description:
      'Associates a Google Place ID with the branch and automatically updates coordinates and address',
  })
  @ApiResponse({
    status: 200,
    description: 'Google Place linked successfully',
  })
  async linkGooglePlace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() placeDto: SetPlaceIdDto,
  ) {
    return await this.branchService.linkGooglePlace(id, placeDto.googlePlaceId);
  }

  @Post(':id/geocode')
  @ApiOperation({
    summary: 'Geocode branch address',
    description:
      'Uses the branch address to find coordinates and Google Place ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Branch geocoded successfully',
  })
  async geocodeBranch(@Param('id', ParseUUIDPipe) id: string) {
    return await this.branchService.geocodeBranchAddress(id);
  }

  @Get(':id/google-details')
  @ApiOperation({
    summary: 'Get Google Maps details for a branch',
    description: 'Fetches complete Google Place information',
  })
  @ApiResponse({
    status: 200,
    description: 'Google Place details retrieved',
  })
  async getBranchGoogleDetails(@Param('id', ParseUUIDPipe) id: string) {
    return await this.branchService.getBranchGoogleDetails(id);
  }

  // @Get(':id/maps-url')
  // @ApiOperation({ summary: 'Get Google Maps URL for a branch' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Google Maps URL generated',
  // })
  // async getGoogleMapsUrl(@Param('id', ParseUUIDPipe) id: string) {
  //   const branch = await this.branchService.findOne(id);
  //   const url = this.branchService.getGoogleMapsUrl(branch);

  //   return {
  //     branchId: branch.id,
  //     branchName: branch.name,
  //     googleMapsUrl: url,
  //   };
  // }

  // // ========== Búsqueda de sucursales cercanas ==========

  // @Post('nearby')
  // @ApiOperation({
  //   summary: 'Find nearby branches',
  //   description: 'Finds branches within a specified radius',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of nearby branches with distances',
  // })
  // async findNearbyBranches(@Body() nearbyDto: FindNearbyBranchesDto) {
  //   return await this.branchService.findNearbyBranches(
  //     nearbyDto.latitude,
  //     nearbyDto.longitude,
  //     nearbyDto.maxDistance || 10,
  //   );
  // }

  // @Get('nearby')
  // @ApiOperation({
  //   summary: 'Find nearby branches (GET version)',
  //   description: 'Finds branches within a specified radius using query params',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of nearby branches with distances',
  // })
  // async findNearbyBranchesGet(@Query() nearbyDto: FindNearbyBranchesDto) {
  //   return await this.branchService.findNearbyBranches(
  //     nearbyDto.latitude,
  //     nearbyDto.longitude,
  //     nearbyDto.maxDistance || 10,
  //   );
  // }
}
