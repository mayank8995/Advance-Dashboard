import { RechartsDevtools } from "@recharts/devtools";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis, type PieSectorShapeProps } from "recharts";
import { PIE_COLORS } from "../../utils/constants";

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={PIE_COLORS[props.index % PIE_COLORS.length]} />;
};

export default function RootCharts({chartType,data,title, X, Y}: any) {
    return <>
        {chartType === 'line' && 
          <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow">
         <div className="flex items-center justify-between text-2xl font-bold">{title}</div>
         <LineChart  key={4364578686} style={{ width: '100%', height: '100%', aspectRatio: 1 }} responsive data={data}>
          <CartesianGrid stroke="#8884d8" strokeDasharray="5 5" />
          <XAxis  dataKey={X}    stroke="#8884d8" />
          <YAxis  dataKey={Y} width="auto"    stroke="#8884d8"  />
          <Line
            type="monotone"
            dataKey={Y}
               stroke="#8884d8" 
            dot={{
              fill: '#8884d8',
            }}
            activeDot={{
              stroke: '#8884d8',
            }}
          />
    <Legend align="right" />
          <Tooltip />
          <RechartsDevtools />
        </LineChart>
          </div>
       }
        {chartType === 'pie' && 
                  <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow">
         <div className="flex items-center justify-between text-2xl font-bold">{title}</div>
            <PieChart style={{ width: '100%', height: '100%', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        dataKey={Y}
        nameKey={X}
        fill="#8884d8"
        isAnimationActive={true}
        shape={MyCustomPie}
      />
      <Tooltip  />
      <RechartsDevtools />
    </PieChart>
            </div>}

        {chartType === 'bar' &&
            <div className="flex-[0] min-w-0">
          <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow">

      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        Skills In Demand (India)
      </h3>
      
      <ResponsiveContainer width="100%" height={250}>
        {/* Crucial: layout="vertical" makes the chart horizontal */}
        <BarChart
          responsive
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
        >
          {/* Hide the grid lines and X-axis line/ticks to match the clean look */}
          <XAxis type="number" hide />
          
          {/* YAxis displays the text labels */}
          <YAxis 
            dataKey={Y} 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#333', fontSize: 14 }}
            width={60}
          />
          
          <Tooltip cursor={{ fill: 'transparent' }} />
          
          {/* The Bar component renders the horizontal bars */}
          <Bar 
            dataKey={X} 
            fill="#3b82f6" 
            radius={[10, 10, 10, 10]} // Gives the bars rounded pill ends
            barSize={14} // Controls the thickness of the bars
            label={{ 
              position: 'right', 
              fill: '#000', 
              fontSize: 14,
              fontWeight: '500',
            //   formatter: (value) => value.toLocaleString() // Adds commas to numbers
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
        }
    </>
}