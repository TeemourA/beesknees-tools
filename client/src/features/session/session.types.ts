export interface UserCredentials {
  email: string;
  password: string;
}

export interface User extends UserCredentials {
  __id: string;
}

export interface SessionData {
  user: User;
  token: string;
}
