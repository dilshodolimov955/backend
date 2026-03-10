import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const roles = this.reflector.get<string[]>("roles", context.getHandler());

        if (!roles) {
            return true;
        }

        if (!user) {
            throw new UnauthorizedException("Siz tizimga kirmagansiz (Token yo'q)");
        }

        if (!user.role || !roles.includes(user.role)) {
            throw new ForbiddenException("Sizda bu amalni bajarish uchun ruxsat yo'q");
        }

        return true;
    }
}