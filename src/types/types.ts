
export interface Login {
  name: string;
  email: string;
}

export interface ProfileForm {
  name: string;
  phone?: string;
  email?: string;
  department?: string;
  designation?: string;
  empId?:string;
  jdate?:string;
  wmode?:string;
  location?:string;
  image?:string | null;
}

export interface LoginForm {
  email: string;
  password: string;
}