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
    $filter: String
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
        status
        createdAt
        updatedAt
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
    login(loginInput: $loginInput) {
      message
      user {
        _id
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REGISTER = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      message
      user {
        _id
        email
        role
        watchPoint
      }
    }
  }
`;

export const BUY_POINTS = gql`
  mutation BuyPoints($createPointInput: CreatePointInput!) {
    createPoint(createPointInput: $createPointInput) {
      message
      point {
        _id
        isApproved
        phone
        points
        price
        trxId
      }
    }
  }
`;

export const POST_VIDEO = gql`
  mutation PostVideo($createVideoInput: CreateVideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      message
      video {
        _id
        title
        url
      }
    }
  }
`;

export const UPDATE_USER_POINT = gql`
  mutation UpdateUserPoint($updateUserInput: UpdateUserInput!) {
    updateUserPoint(updateUserInput: $updateUserInput)
  }
`;

export const SEND_POINTS = gql`
  mutation SendPoints($pointId: String!, $status: String!) {
    sendPointsToUser(pointId: $pointId, status: $status) {
      message
      point {
        isApproved
        status
      }
    }
  }
`;
