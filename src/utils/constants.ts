import { validateFormOne, validateFormTwo } from "../services/form-validation.service";

export const KEY_TRACK_METRIC = {
            TOTAL_EMPLOYEES: "Total Employees",
             NOTICE_PERIOD_EMP: "Employees on notice period",
             AVG_EMP_SAT: "Average Employees Satisfaction",
             ACTV_PROJ: "Active Projects"
} as const;
export const KEY_TRACK_METRIC_ICON = {
             STAR : "STAR",
             USER:"USER",
             MONITER_CHECK : "MONITER_CHECK",
             FLAG: "FLAG"
}
export const gradients = [
  'bg-gradient-to-br from-pink-400 to-rose-500',
  'bg-gradient-to-br from-indigo-400 to-violet-500',
  'bg-gradient-to-br from-emerald-400 to-teal-500',
  'bg-gradient-to-br from-amber-400 to-orange-500',
  'bg-gradient-to-br from-sky-400 to-blue-500',
]

export const bgColors = [
  'bg-purple-500',
  'bg-violet-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-blue-500',
]

export const TOP_PROJECTS = "Top Projects"
export const ATTRITION_INSIGHTS = "Attrition Insights"
export const DEPARTMENT_WISE_HEADCOUNT = "Department-wise Headcount"
export const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#8884d8'];
export const REVENUE_TREND_IN_CR = "Revenue Trend (₹ Cr)"
export const SKILLS_IN_DEMAND = "Skils in Demand"
export const TOP_CLIENTS = "Top clients"
export const TOP_PERFORMERS = "Top performers"
export const PROMOTED_THIS_YEAR = "PROMOTED_THIS_Year"
export const EMPLOYEE_DIREC = "Employee Directory"



export const NAV_ITEMS = {
    DASHBOARD: "/home/dashboard",
    ANALYTICS: "/home/analytics",
    EMPLOYEES: "/home/employees",
    SETTINGS: "/home/settings",
    LOGOUT: "/"
}

export const SIDE_BAR_ITEMS = {
    DASHBOARD: "Dashboard",
    ANALYTICS: "Analytics",
    EMPLOYEES: "Employees",
    SETTINGS: "Profile Settings",
    LOGOUT: "Logout"
}



export const RISK_STATUS = {
    ON_TRACK: "On Track",
    COMPLETED: "Completed",
    AT_RISK: "At Risk"
}

export const PROJECT_DETAILS = {
    MANAGER: "Project Lead"
}

export const className_ = `w-full
px-4
py-3
mb-2
rounded-xl
border
border-slate-300
bg-white
text-base
font-medium
text-slate-800
placeholder:text-slate-400
placeholder:font-normal
focus:border-blue-500
focus:ring-4
focus:ring-blue-100
outline-none
transition-all
duration-200`

export const loginClassName = `w-full
  focus:ring-[#534ab7] 
  focus:border-[#7c3aed]/50
  focus:outline-none 
  focus:ring-2 
  focus:border-transparent
  focus:transition-all focus:duration-200
  bg-[#0f0a1f] border border-white/10 rounded-lg px-3 py-2.5 
  text-slate-200 text-sm placeholder:text-slate-500
  `

export const className = `w-full px-4 py-2.5 
  bg-slate-50 dark:bg-slate-800
  border border-slate-200  dark:border-slate-700
  rounded-xl 
  text-slate-800 dark:text-slate-300
  text-sm
  focus:outline-none 
  focus:ring-2 
  focus:ring-indigo-400 dark:focus:ring-slate-800
  focus:border-transparent
  focus:bg-white dark:focus:dark:bg-slate-800
  focus:transition-all focus:duration-200
  placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:scheme-dark`

  export const labelclassName = `block mb-1.5 mt-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide`

  export const loginLabelclassNAme = `block mb-1.5 mt-1.5 text-slate-400 text-xs font-medium tracking-wide uppercase`

  export const PROFILE_SUBHEAD = "Manage your personal information and account details"

  export const VIEW_MORE = "View More"

export const headers_top_projects = [
            {key:"name", value:"NAME"},
            {key:"projectName", value:"PROJECT NAME"},
            {key:"riskStatus", value:"RISK STATUS"},
            {key:"status", value:"STATUS"}
]
 export const columns_top_projects = {
            "name":"name",
             "projectName":"projectName",
            "riskStatus":"riskStatus",
            "status":"status"          
}

export const headers_top_performers = [
            {key:"id", value:"ID"},
            {key:"name", value:"NAME"},
            {key:"designation", value:"DESIGNATION"},
            {key:"department", value:"DEPARTMENT"},
            {key:"rating", value:"RATING"}
]
 export const columns_top_performers = {
            "id":"id",
             "name":"name",
            "designation":"designation",
            "department":"department",
            "rating": "rating"       
}
export const headers_promotedThisYear = [
            {key:"id", value:"ID"},
            {key:"name", value:"NAME"},
            {key:"currentDesignation", value:"DESIGNATION"},
            {key:"previousDesignation", value:"PREV DESIGNATION"},
            {key:"department", value:"DEPARTMENT"},
            {key:"promotedOn", value:"PROMOTED ON"}
]
 export const columns_promotedThisYear = {
            "id":"id",
            "name":"name",
            "currentDesignation":"designation",
            "previousDesignation":"previousDesignation",      
            "department":"department",              
            "promotedOn":"promotedOn"
}

export const headers_requiringReview = [
            {key:"id", value:"ID"},
            {key:"name", value:"NAME"},
            {key:"designation", value:"DESIGNATION"},
            {key:"department", value:"DEPARTMENT"},
            {key:"reviewReason", value:"REVIEW REASON"},
            {key:"rating", value:"RATING"}
]
 export const columns_requiringReview = {
            "id":"id",
             "name":"name",
            "designation":"designation",
            "department":"department",
            "reviewReason":"reviewReason",
            "rating":"rating"
}

export const CARD_CONTENT_LIMIT_TO_SCROLL = 5

export const VIEW_MORE_ROUTES = {
    "top_projects" : "topProjects",
    "top_performers": "topPerformers",
    "promotedThisYear": "promotedThisYear",
    "requiringReview": "requiringReview"
}

export const VIEW_MORE_ROUTES_VALUES = {
    "top_projects" : "Top Projects",
    "top_performers": "Top Performers",
    "promotedThisYear": "Promoted This Year",
    "requiringReview": "Requiring Review"
}

export const headers_employees = [
            {key:"id", value:"ID"},
            {key:"name", value:"NAME"},
            {key:"designation", value:"DESIGNATION"},
            {key:"department", value:"DEPARTMENT"},
            {key:"yearsOfExperience", value:"YEARS EXP"},
            {key:"location", value:"LOCATION"},
            {key:"workMode", value:"WORK MODE"},
            {key:"rating", value:"RATING"}
]
 export const columns_employees = {
            "id":"id",
             "name":"name",
            "designation":"designation",
            "department":"department",
            "yearsOfExperience": "yearsOfExperience",
            "location": "location",
            "workMode": "workMode", 
            "rating": "workMode" 
}

export const ADMIN_PORTAL = "Admin Portal"

export const NO_RESULT_FOUND = "No match found"

// map step index -> its slice key + validator
export const stepConfig = [
  { key: 'formOne' as const, validate: validateFormOne },
  { key: 'formTwo' as const, validate: validateFormTwo }
];

export const MSG_404 = "Endpoint not found"

export const FILTER_TABLE_KEY = ["department", "designation", "location","workMode","employeeSatisfaction","onNoticePeriod"]

export const CORRESPONDING_FILTER_TABLE_KEY_NAME = { 
                                                      "department": "Department" , 
                                                      "designation":"Designation",
                                                      "location": "Location", 
                                                      "workMode": "Work Mode", 
                                                      "employeeSatisfaction": "Employee Satisfaction", 
                                                      "onNoticePeriod": "On Notice Period"
                                                    }
        