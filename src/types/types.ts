import type { QueryClientConfig } from '@tanstack/react-query';
import type { ChangeEvent, ComponentProps, ReactNode } from 'react';

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
  data: ListType[];
  status: number;
  statusText: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorResponseObject {
  data: any;
  status: number;
  statusText: string;
  code?: string;
  config?: any;
  request?: any;
  response?: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */

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
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
type ErrorPageProps = {
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
};
export type TopPerformersList = {
  topPerformersList: TopPerformersCardProps;
  title?: string;
};
export type TopProjectsList = ErrorPageProps & {
  topProjects: TopProject;
  title?: string;
};

export type MeetingKPIList = {
  meetingKPIs: MeetingKPIsCardProps;
  title?: string;
};
export type PromotedList = {
  promotedThisYear: PromotedThisYearCardProps;
  title?: string;
};

export type ReviewList = {
  requiringReview: RequiringReviewCardProps;
  title?: string;
};

export type TableToolbarProps = {
  txtToBeSearched: string;
  setTextToBeSearched: (e: string) => void;
  tableQueryParams: TableQueryParams;
  handleRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  openFilterModal: () => void;
  openSortModal: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  bulkAction?: () => void;
  selectedRow: Set<unknown>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => void;
};
export type HeaderType =
  | TableHeader<Employee>[]
  | TableHeader<TopPerformer>[]
  | TableHeader<TopProject>[]
  | TableHeader<PromotedEmployee>[]
  | TableHeader<EmployeeRequiringReview>[];
export type ColumnType =
  | Column<Employee>[]
  | Column<TopPerformer>[]
  | Column<TopProject>[]
  | Column<PromotedEmployee>[]
  | Column<EmployeeRequiringReview>[];

export type DesktopTableProps = {
  list: ListType[];
  columnsData: ColumnType;
  headersData: HeaderType;
  rowsPerPage: number;
  handleSort: (e: string) => void;
  getSortIcon: (e: string) => void;
  tableQueryParams?: TableQueryParams;
  selectedRow: Set<unknown>;
  setSelectedRow: React.Dispatch<React.SetStateAction<Set<unknown>>>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => void;
};

export type MobileTableProps = {
  list: ListType[];
  rowsPerPage: number;
  columnsData:
    | Column<Employee>[]
    | Column<TopPerformer>[]
    | Column<TopProject>[]
    | Column<PromotedEmployee>[]
    | Column<EmployeeRequiringReview>[];
  tableQueryParams?: TableQueryParams;
  selectedRow: Set<unknown>;
  setSelectedRow: React.Dispatch<React.SetStateAction<Set<unknown>>>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => void;
};

export type FilterList = {
  tableType: string;
};

export type DonutChartProps = {
  data: ProjectStatusDistribution;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputFieldType = ComponentProps<'input'> & {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  errors?: any;
  data?: any;
  maxlength?: number | undefined;
  onChange?: (e: any, name?: any) => any;
};
/* eslint-disable @typescript-eslint/no-explicit-any */

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
  id: string;
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
export type ListType =
  | Employee
  | TopPerformer
  | TopProject
  | PromotedEmployee
  | EmployeeRequiringReview;

export type CustomTableProps = ErrorPageProps & {
  list: ListType[];
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

type Trend = 'up' | 'down';

type EmployeeBase = {
  id: number;
  name: string;
  department: string;
};

type PerformanceCardBase = {
  title: string;
  icon: string;
  count: number;
  percentage: number;
  trend: Trend;
  trendValue: number;
  description: string;
};

export type TopPerformersCardProps = PerformanceCardBase & {
  employees: TopPerformer[];
};

export type PromotedThisYearCardProps = PerformanceCardBase & {
  employees: PromotedEmployee[];
};

export type KPIBreakdownItem = {
  label: string;
  count: number;
  percentage: number;
  ratingRange: string;
};

type KPITrendHistoryItem = {
  month: string;
  percentage: number;
};

export type MeetingKPIsCardProps = PerformanceCardBase & {
  breakdown: {
    exceeding: KPIBreakdownItem;
    meeting: KPIBreakdownItem;
    notMeeting: KPIBreakdownItem;
  };
  trend_history: KPITrendHistoryItem[];
};

type ReviewReasonItem = {
  label: string;
  count: number;
};

type EmployeeSatisfaction = 'Low' | 'Medium' | 'High';

type ReviewReason =
  | 'Low Rating'
  | 'Low Attendance'
  | 'On Notice Period'
  | 'Low Satisfaction';

type ReviewEmployee = EmployeeBase & {
  designation: string;
  rating: number;
  attendancePercentage: number;
  employeeSatisfaction: EmployeeSatisfaction;
  onNoticePeriod: boolean;
  reviewReason: ReviewReason[];
};

export type RequiringReviewCardProps = PerformanceCardBase & {
  reasons: {
    lowRating: ReviewReasonItem;
    lowAttendance: ReviewReasonItem;
    onNoticePeriod: ReviewReasonItem;
    lowSatisfaction: ReviewReasonItem;
  };
  employees: ReviewEmployee[];
};

export type PerformanceCards = {
  topPerformers: TopPerformersCardProps;
  promotedThisYear: PromotedThisYearCardProps;
  meetingKPIs: MeetingKPIsCardProps;
  requiringReview: RequiringReviewCardProps;
};

export type KeyMetricCards = {
  data?: PerformanceCards;
};

type AnalyticsSummary = {
  totalEmployees: number;
  activeProjects: number;
  revenueThisQuarterCr: number;
  profitMargin: number;
  attritionRate: number;
};

type HeadcountByLocation = {
  city: string;
  employeeCount: number;
};

type RevenueTrendItem = {
  month: string;
  revenueCr: number;
};

export type ProjectStatusDistribution = {
  totalProjects: number;
  onTrack: number;
  atRisk: number;
  delayed: number;
  completed: number;
};

type DepartmentHeadcount = {
  department: string;
  count: number;
};

type UtilizationTrendItem = {
  month: string;
  utilization: number;
};

type AttritionTrendItem = {
  month: string;
  rate: number;
};

type AttritionInsights = {
  thisMonth: number;
  lastMonth: number;
  employeesOnNoticePeriod: number;
  yearlyAttritionRate: number;
  trend: AttritionTrendItem[];
};

type TopClient = {
  client: string;
  industry: string;
  revenueCr: number;
  contributionPercentage: number;
};

type SkillInDemand = {
  skill: string;
  employeeCount: number;
};

type AlertSeverity = 'warning' | 'success' | 'info';

type AnalyticsAlert = {
  id: number;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
};

export type Analytics = {
  summary: AnalyticsSummary;
  headcountByLocation: HeadcountByLocation[];
  revenueTrend: RevenueTrendItem[];
  projectStatusDistribution: ProjectStatusDistribution;
  departmentHeadcount: DepartmentHeadcount[];
  utilizationTrend: UtilizationTrendItem[];
  attritionInsights: AttritionInsights;
  topClients: TopClient[];
  skillsInDemand: SkillInDemand[];
  alerts: AnalyticsAlert[];
};

export type AnalyticsCard = {
  data?: Analytics;
};

export type KeyMetricCardsProps = {
  metricData?: Analytics;
};

export type KeyMetricCardsConfig = {
  [key: string]: {
    value: number;
    icon: string;
  };
};

export type ExportHeader<T> = {
  key: keyof T;
  value: string;
};

export type NavItems = {
  name: string;
  path: string;
};
