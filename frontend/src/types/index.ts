export enum ActionType {
  LOGIN = "user/login",
  LOGOUT = "user/logout",
  SET_LOAD_VIDEOS = "videos/setLoadVideos",
  SET_VIDEO = "videos/setVideo",
}

export type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type Video = {
  _id: string;
  title: string;
  url: string;
};
