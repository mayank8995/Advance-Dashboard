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

export const TOP_PROJECTS = "Top Projects"
export const ATTRITION_INSIGHTS = "Attrition Insights"
export const DEPARTMENT_WISE_HEADCOUNT = "Department-wise Headcount"
export const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#8884d8'];
export const REVENUE_TREND_IN_CR = "Revenue Trend (₹ Cr)"
export const SKILLS_IN_DEMAND = "Skils in Demand(India)"

export const NAV_ITEMS = {
    DASHBOARD: "/home/dashboard",
    ANALYTICS: "/home/analytics",
    EMPLOYEES: "/home/employees",
    SETTINGS: "/home/settings"
}

export const SIDE_BAR_ITEMS = {
    DASHBOARD: "Dashboard",
    ANALYTICS: "Analytics",
    EMPLOYEES: "Employees",
    SETTINGS: "Profile Settings"
}



export const RISK_STATUS = {
    ON_TRACK: "On Track",
    COMPLETED: "Completed",
    AT_RISK: "At Risk"
}

export const PROJECT_DETAILS = {
    MANAGER: "Project Lead"
}

export const className = `w-full
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