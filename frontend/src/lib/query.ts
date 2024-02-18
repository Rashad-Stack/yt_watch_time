import { gql } from "@apollo/client";

// QUERIES
export const GET_USERS = gql`
  query GetAllUsers {
    users {
      _id
      email
      password
    }
  }
`;

export const GET_SESSION = gql`
  query GetSession {
    session {
      _id
      email
      watchPoint
      role
    }
  }
`;

export const GET_VIDEOS = gql`
  query GetAllVideos($limit: Float, $page: Float) {
    allVideos(limit: $limit, page: $page) {
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

export const GET_POINTS = gql`
  query GetAllPoints(
    $filter: Boolean
    $limit: Int
    $page: Int
    $search: String
  ) {
    points(filter: $filter, limit: $limit, page: $page, search: $search) {
      total
      pages
      points {
        _id
        isApproved
        phone
        points
        price
        trxId
        user {
          _id
          email
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
  mutation Logout {
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

export const UPDATE_USER_POINT = gql`
  mutation UpdateUserPoint($updateUserInput: UpdateUserInput!) {
    updateUserPoint(updateUserInput: $updateUserInput)
  }
`;
