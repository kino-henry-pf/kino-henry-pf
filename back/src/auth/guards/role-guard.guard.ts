import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const metaRole = this.reflector.getAllAndOverride('role', [context.getHandler(), context.getClass()])

    const request = context.switchToHttp().getRequest()

    const userRole = request.user.role

    const acceso = metaRole === userRole
    if(!acceso) throw new ForbiddenException('No tienes acceso')
    return true;
   }
}