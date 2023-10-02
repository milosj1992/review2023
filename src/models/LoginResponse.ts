export interface LoginResponse {
  statusCode: number;
  id: number | null;
  userToken: string ;
}

export interface User {
    email: string;
    firstName: string;
    gender: string;
    id: number | null;
    image: string;
    lastName: string;
    token: string;
    username: string;
  }
