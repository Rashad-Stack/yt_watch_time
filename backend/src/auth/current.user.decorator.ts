import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    try {
      const ctx = GqlExecutionContext.create(context);
      const token = ctx.getContext()?.req?.cookies?.token;

      if (!token) {
        throw new UnauthorizedException(
          "You are not logged in. Please log in and try again.",
        );
      }

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as jwt.JwtPayload;

      if (!payload) {
        throw new UnauthorizedException(
          "Your token has expired or invalid. Please log in and try again.",
        );
      }

      return payload.id;
    } catch (error) {
      throw new UnauthorizedException(
        "Your token has expired or invalid. Please log in and try again.",
        {
          cause: new Error("Invalid token!"),
        },
      );
    }
  },
);
