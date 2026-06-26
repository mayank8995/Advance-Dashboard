import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "../../hooks/useTheme";



export default function BarChartComponent({data,title, X, Y}: any) {
  const {theme: themeMode} = useTheme()

 return <>
  <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200  dark:bg-gradient-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
        <div className="flex items-center justify-between text-lg font-bold dark:text-slate-100">{title}</div>
 <div className="flex items-center justify-between text-lg font-bold dark:text-slate-100">{title}</div>
                                <div  className="overflow-y-auto min-h-0 max-h-[350px]">
 <ResponsiveContainer width="100%" height={250}>
        {/* Crucial: layout="vertical" makes the chart horizontal */}
        <BarChart
          responsive
          data={data}
          layout="vertical"
          className="flex items-center justify-between text-sm font-bold"
        >
          {/* Hide the grid lines and X-axis line/ticks to match the clean look */}
          <XAxis type="number" hide  className="flex items-center justify-between text-sm font-bold outline-0" />
          
          {/* YAxis displays the text labels */}
          <YAxis 
            dataKey={Y} 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: themeMode === 'dark' ? '#f3f4f6' : '#333', fontSize: 12 }}
            width={60}
            className="flex items-center justify-between text-sm font-bold outline-0"           
          />
          
          <Tooltip cursor={{ fill: 'transparent' }} />
          
          {/* The Bar component renders the horizontal bars */}
          <Bar 
            dataKey={X} 
            fill="#3b82f6" 
            radius={[10, 10, 10, 10]} // Gives the bars rounded pill ends
            barSize={10} // Controls the thickness of the bars
            label={{ 
              position: 'right', 
              fill: themeMode === 'dark' ? '#f3f4f6' : '#333',
              fontSize: 12,
              fontWeight: '500',
            //   formatter: (value) => value.toLocaleString() // Adds commas to numbers
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
      </div>
      </>
    }