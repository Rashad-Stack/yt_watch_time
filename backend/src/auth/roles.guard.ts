import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Injectable()
@UseGuards(AuthGuard)
export class RolesGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext()?.req?.cookies?.token;

    const payload = this.authService.verifyToken(token);

    if (payload?.role !== "admin") {
      throw new ForbiddenException(
        "You are not authorized to perform this action!",
      );
    }

    return true;
  }
}
