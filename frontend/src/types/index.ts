export enum ActionType {
  LOGIN = "user/login",
  LOGOUT = "user/logout",
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
