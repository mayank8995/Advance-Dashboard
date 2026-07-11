export interface Login {
  name: string;
  email: string;
  id: string;
}

export interface ProfileForm {
  name: string;
  phone?: string;
  email?: string;
  department?: string;
  designation?: string;
  empId?: string;
  jdate?: string;
  wmode?: string;
  location?: string;
  image?: string | null;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  department: string;
  designation: string;
  empId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormData {
  formOne: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  formTwo: { designation: string; department: string; empId: string };
}

export type Errors = Partial<Record<string, string>>;

export const initialFormData: FormData = {
  formOne: { name: '', email: '', password: '', confirmPassword: '' },
  formTwo: { designation: '', department: '', empId: '' },
};

export interface ResponseObject {
  data: any;
  status: number;
  statusText: string;
}

export interface ErrorResponseObject {
  data: any;
  status: number;
  statusText: string;
  code?: string;
  config?: any;
  request?: any;
  response?: any;
}

export type FilterQueryObject = {
  key: string;
  value: string | string[] | boolean;
};

export type TableQueryParams = {
  page: number;
  limit: number;
  search?: string;
  totalItems?: number;
  totalPages?: number;
  sortBy?: string;
  order?: string;
  tableType?: string;
  [key: string]: any;
};

export type TopPerformersList = {
  topPerformersList: any;
  title?: string;
};
export type TopProjectsList = {
  topProjects: any;
  title?: string;
};
export type MeetingKPIList = {
  meetingKPIs: any;
  title?: string;
};
export type PromotedList = {
  promotedThisYear: any;
  title?: string;
};

export type ReviewList = {
  requiringReview: any;
  title?: string;
};

export type TableToolbarProps = {
  txtToBeSearched: string;
  setTextToBeSearched: (e: string) => void;
  tableQueryParams: TableQueryParams;
  handleRowsPerPageChange: (e: any) => void;
  tableCustomFilterData: any;
  openFilterModal: () => void;
  openSortModal: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
};

export type DesktopTableProps = {
  list: any;
  headersData: any;
  columnsData: any;
  handleSort: (e?: any) => void;
  getSortIcon: (e?: any) => void;
};

export type MobileTableProps = {
  list: any;
  headersData: any;
};

export type FilterList = {
  tableType: string;
};
