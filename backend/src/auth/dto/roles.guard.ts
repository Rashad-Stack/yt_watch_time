import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext()?.req?.cookies?.token;

    if (!token) {
      throw new UnauthorizedException(
        "You are not logged in. Please log in and try again.",
      );
    }

    const payload = this.authService.verifyToken(token);

    if (payload.role !== "admin") {
      throw new ForbiddenException(
        "You are not authorized to perform this action!",
      );
    }

    return true;
  }
}
