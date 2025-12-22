// src/types.ts

export interface LoginResponse {
  token: string;
  email: string;
  _id: string;
}

export interface UiItem {
  id?:string;
  name: string;
  imageUrl: string;
  htmlUrl: string;
}
