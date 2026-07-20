import type { QueryClientConfig } from '@tanstack/react-query';
import type { ComponentProps, ReactNode } from 'react';

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
  tableCustomFilterData?: any;
  openFilterModal: () => void;
  openSortModal: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
};

export type DesktopTableProps = {
  list: any;
  headersData: any;
  columnsData: any;
  rowsPerPage: number;
  handleSort: (e?: any) => void;
  getSortIcon: (e?: any) => void;
  tableQueryParams?: TableQueryParams;
};

export type MobileTableProps = {
  list: any;
  rowsPerPage: number;
  columnsData: any;
  tableQueryParams?: TableQueryParams;
};

export type FilterList = {
  tableType: string;
};

export type DonutChartProps = {
  data: any;
  title: string;
};

export type SkeletonProps = {
  target?: string | null;
};

export type QueryClientConfigProps = QueryClientConfig & {
  refetchAll?: () => void;
};

export type BadgeProps = {
  value: string;
};

export type RatingProps = {
  value: string;
};

export type StatusBadgeProps = {
  value: string;
};

export type NameBadgeProps = {
  value: string;
};

export type ReviewReasonBadgeProps = {
  value: string;
};

export type InputFieldType = ComponentProps<'input'> & {
  label?: string;
  type: string;
  name: string;
  placeholder: string;
  errors?: any;
  maxlength?: number | undefined;
  data?: any;
  // onChange?: (e: any, name?: any) => any;
};

export type CheckBox = Record<string, boolean>;

interface Project {
  projectName: string;
  status: ProjectStatus;
  riskStatus: RiskStatus;
  priorityRanking: number;
}
type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
type ProjectStatus = 'Active' | 'Support' | 'On Hold' | 'Completed';
type RiskStatus = 'On Track' | 'At Risk' | 'Delayed';
type SatisfactionLevel = 'Low' | 'Medium' | 'High';

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager: string;
  joiningDate: string;
  yearsOfExperience: number;
  salary: number;
  location: string;
  workMode: WorkMode;
  projects: Project[];
  skills: string[];
  rating: number;
  attendancePercentage: number;
  employeeSatisfaction: SatisfactionLevel;
  onNoticePeriod: boolean;
}

export type EmployeeProps = {
  list: Employee[];
};

export type Column<T> = {
  [K in keyof T]: {
    key: K;
    header: string;
    render?: (value: string) => ReactNode;
  };
}[keyof T];

export interface TopPerformer {
  id: number;
  name: string;
  designation: string;
  department: string;
  rating: number;
}

export interface TopProject {
  name: string;
  projectName: string;
  riskStatus: string;
  status: string;
}

export interface PromotedEmployee {
  id: number;
  name: string;
  currentDesignation: string;
  previousDesignation: string;
  department: string;
  promotedOn: string;
}

export interface EmployeeRequiringReview {
  id: number;
  name: string;
  designation: string;
  department: string;
  reviewReason: string;
  rating: number;
}

export type TableHeader<T> = {
  key: keyof T;
  value: string;
};

export type CustomTableProps = {
  list: Employee;
  tableQueryParams: TableQueryParams;
  handleTableQuery: (data: TableQueryParams, signal?: AbortSignal) => void;
  columnsData:
    | Column<Employee>[]
    | Column<TopPerformer>[]
    | Column<TopProject>[]
    | Column<PromotedEmployee>[]
    | Column<EmployeeRequiringReview>[];
  headersData:
    | TableHeader<Employee>[]
    | TableHeader<TopPerformer>[]
    | TableHeader<TopProject>[]
    | TableHeader<PromotedEmployee>[]
    | TableHeader<EmployeeRequiringReview>[];
  title: string;
  setQuery: React.Dispatch<React.SetStateAction<TableQueryParams>>;
};
