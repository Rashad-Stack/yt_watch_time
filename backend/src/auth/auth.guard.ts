import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Get the context
      const ctx = GqlExecutionContext.create(context);

      // Get the token from the request cookies
      const token = ctx.getContext()?.req?.cookies?.token;
      if (!token) {
        throw new UnauthorizedException(
          "You are not logged in. Please log in and try again.",
        );
      }

      // Verify the token
      const payload = this.authService.verifyToken(token);
      if (!payload) {
        throw new UnauthorizedException(
          "Your token has expired or invalid. Please log in and try again.",
        );
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
