
export interface Login {
  name: string;
  email: string;
}

export interface ProfileForm {
  name: string;
  phone: string;
  email: string;
  department: string;
  designation: string;
  id:string;
  jdate:Date;
  wmode:string;
  location:string;
  image:File | null;
}