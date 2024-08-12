import { Control, RegisterOptions } from 'react-hook-form';

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
export type TextColor = 'black' | 'lightBlack' | 'darkGray' | 'gray' | 'lightGray' | 'white' | 'main' | 'disabled';
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
  name: string;
  options: Tag[];
  maxSelection?: number;
  control: Control<any>;
  rules?: RegisterOptions; // 유효성 검사 규칙
}
