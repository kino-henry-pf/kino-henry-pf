import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const auth = request.headers.authorization

    if(!auth) throw new UnauthorizedException

    const [type, token] = auth.split(" ")
    if(!token || type !== "Bearer") throw new UnauthorizedException

    try {
      const payload = this.jwtService.verify(token, {secret: env.JWT_SECRET})
      request.user = payload
      return true
    } catch (error: any) {
      if(error.name === "TokenExpiredError") throw new UnauthorizedException("Se ha expirado el tiempo del token")
        else throw new UnauthorizedException("Fallo la verificacion del token")
      
    }
  }
}
