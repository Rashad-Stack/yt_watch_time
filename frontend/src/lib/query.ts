import { gql } from "@apollo/client";

// QUERIES
export const GET_USERS = gql`
  query {
    users {
      _id
      email
      password
    }
  }
`;

export const GET_SESSION = gql`
  query {
    session {
      _id
      email
      watchPoint
      role
    }
  }
`;

export const GET_VIDEOS = gql`
  query GetAllVideos($limit: Float) {
    allVideos(limit: $limit) {
      totalVideos
      videos {
        _id
        title
        url
        user {
          _id
        }
      }
    }
  }
`;

// MUTATIONS
export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const REGISTER = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput)
  }
`;

export const BUY_POINTS = gql`
  mutation BuyPoints($createPointInput: CreatePointInput!) {
    createPoint(createPointInput: $createPointInput)
  }
`;

export const POST_VIDEO = gql`
  mutation BuyPoints($createVideoInput: CreateVideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      _id
      title
      url
    }
  }
`;
