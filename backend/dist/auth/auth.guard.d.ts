import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
