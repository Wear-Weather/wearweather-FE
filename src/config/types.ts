import { Control, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface WeatherInfo {
  [key: string]: any;
}

export interface Location {
  city: string | null;
  district: string | null;
}

export interface PostMeta {
  postId: number;
  thumbnail: string;
  location: Location;
  SeasonTagId: number;
  WeatherTagIds: number[];
  TemperatureTagIds: number[];
  likeByUser: boolean;
}

export type TextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl';
export type TextColor =
  | 'black'
  | 'lightBlack'
  | 'darkGray'
  | 'gray'
  | 'lightGray'
  | 'white'
  | 'main'
  | 'disabled'
  | 'error'
  | 'success';
export type TextWeight = 'regular' | 'bold';

export interface PostFormData {
  title: string;
  content: string;
  location: Location;
  weatherTagIds: number[];
  temperatureTagIds: number[];
  seasonTagId: number | null;
  imageId: number[];
}

export interface Tag {
  id: number;
  category: string;
  value: string;
  name: string;
}
export interface SelectProps {
  name: keyof PostFormData;
  options: Tag[];
  maxSelection?: number;
  control: Control<any>;
  rules?: RegisterOptions; // 유효성 검사 규칙
}

export interface FileProps {
  name: keyof PostFormData;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
  setValue: UseFormSetValue<PostFormData>;
  register: UseFormRegister<PostFormData>;
}

export interface ErrorResponse {
  errorCode?: string;
  errorMessage?: string;
}

export type AuthFormName = 'email' | 'code' | 'password' | 'confirmPassword' | 'name' | 'nickname';

export interface VerifyCodeProps {
  email: string;
  code: string;
}

export interface SignupForm {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  terms: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  nickname: string;
  isSocial: boolean;
}
