// src/types.ts

export interface LoginResponse {
  token: string;
  email: string;
  _id: string;
}

export interface UiItem {
  _id?:string;
  title: string;
  image: string;
  link: string;
  designer:string
  category: string;
}
