import { ApolloError } from "@apollo/client";
import { isArray } from "@apollo/client/utilities";
import { GraphQLError } from "graphql";
import React from "react";
import { AuthAction } from "../context/authcontext";
import { ActionType } from "../types";

type UnknownError = Error & { message: string[] };

const unknownError = (error: UnknownError) => {
  if (isArray(error?.message)) {
    const message = error?.message?.map((err: string): string => {
      return err;
    });

    return message.join(" & ");
  }
  return error?.message || "Something went wrong";
};

export const handleError = (
  error: Error | ApolloError | undefined,
  clearUser?: React.Dispatch<AuthAction>,
): string => {
  console.log("full", error);

  if (error instanceof ApolloError) {
    console.log("gql", error?.graphQLErrors);
    if (error.graphQLErrors.length > 0) {
      const gqlError = error?.graphQLErrors?.map((err: GraphQLError) => {
        if (err.extensions?.originalError) {
          const refactorError = err?.extensions?.originalError as UnknownError;
          return unknownError(refactorError);
        }
        if (err.message === "jwt expired") {
          clearUser?.({ type: ActionType.LOGOUT });
          return "Session expired. Please login again.";
        }
        if (err.message === "Invalid token!") {
          clearUser?.({ type: ActionType.LOGOUT });
          return "Session expired. Please login again.";
        }
        return err.message;
      });
      return gqlError.join(" & ");
    }
  }

  return "An error occurred. Please try again.";
};
