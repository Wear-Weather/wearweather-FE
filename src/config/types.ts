import {
  Control,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface WeatherInfo {
  [key: string]: any;
}

export interface Location {
  city: string;
  district: string;
}

export interface PostMeta {
  postId: number;
  thumbnail: string;
  location: Location;
  seasonTagId: number;
  weatherTagIds: number[];
  temperatureTagIds: number[];
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
export type TextMargin = string;

export type HrLineHeight = { height: 1 | 8 };

export type FilterBtn = {
  id?: string;
  onClickFunc: (btnValue: string) => void;
  isActive?: boolean | (() => boolean);
  isSelected?: boolean;
};
export type FilterBtnGroupProps = FilterBtn & {
  btnData: any[];
};

export interface FilterItem {
  id: number | { city: number; district: number };
  tagName: string;
}

export type PostFilterModalProps = {
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnValue: string;
  btnIndex: number;
};

export type SectionKey = 'location' | 'weather' | 'temperature' | 'season';

export interface DistrictProps {
  city_id: number;
  district_id: number;
  district: string;
}

export type DistrictArray = DistrictProps[];

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

export interface VerifyCodeProps {
  email: string;
  code: string;
}

export interface FormMethods<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  trigger: UseFormTrigger<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  formState: { errors: FieldErrors<T> };
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
