export enum ActionType {
  LOGIN = "user/login",
  LOGOUT = "user/logout",
  SET_LOAD_VIDEOS = "videos/setLoadVideos",
  SET_VIDEO = "videos/setVideo",
}

export enum Status {
  Declean = "Declean",
  Approved = "Approved",
  Approve = "Approve",
}

export type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type User = {
  _id: string;
  email: string;
  role: string;
  watchPoint: number;
};

export type Video = {
  _id: string;
  title: string;
  url: string;
  user: User;
};

export type Points = {
  _id: string;
  isApproved: boolean;
  phone: string;
  points: number;
  price: number;
  trxId: string;
  status: Status;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
