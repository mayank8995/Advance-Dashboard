import { RechartsDevtools } from "@recharts/devtools";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis, type PieSectorShapeProps } from "recharts";
import { PIE_COLORS } from "../../utils/constants";

const MyCustomPie = (props: PieSectorShapeProps) => {
  // console.log("Rendering custom pie sector with props:", props);
  return <Sector {...props} fill={PIE_COLORS[props.index % PIE_COLORS.length]} />;
};



export default function RootCharts({chartType,data,title, X, Y}: any) {

const RenderCustomLegend = () => {
  console.log("Rendering custom legend with data:", data);
  return (
    <div>
      {data.map((entry: any, index: any) => {
        const itemColor = PIE_COLORS[index % PIE_COLORS.length]
        return (
          <div key={entry[X]} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Custom Legend Icon */}
            <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: itemColor }} />
            {/* Legend Label */}
            <span style={{ fontSize: '14px', color: '#333' }}>{entry[X]}</span>
          </div>
        );
      })}
    </div>
  );
};
    return <>
        {chartType === 'line' && 
          <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-lg  transition-all duration-300">
         <div className="flex items-center justify-between text-lg font-bold">{title}</div>
         <div  className="overflow-y-auto min-h-0 max-h-[350px]">
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
          </div>
       }
        {chartType === 'pie' && 
                  <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-lg  transition-all duration-300">
         <div className="flex items-center justify-between text-lg font-bold">{title}</div>
         <div  className="overflow-y-auto min-h-0 max-h-[350px]">
            <PieChart style={{ width: '100%', height: '100%', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        dataKey={Y}
        nameKey={X}
        isAnimationActive={true}
        shape={MyCustomPie}
        labelLine={true}
      />
      <Tooltip  />
      <Legend layout="vertical" align="right" verticalAlign="top" content={RenderCustomLegend} /> 
      <RechartsDevtools />
           </PieChart>
           </div>
            </div>}

        {chartType === 'bar' &&
          <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-lg  transition-all duration-300">

      <div className="flex items-center justify-between text-lg font-bold">{title}</div>
         <div  className="overflow-y-auto min-h-0 max-h-[350px]">
      
      <ResponsiveContainer width="100%" height={250}>
        {/* Crucial: layout="vertical" makes the chart horizontal */}
        <BarChart
          responsive
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
          className="flex items-center justify-between text-sm font-bold"
        >
          {/* Hide the grid lines and X-axis line/ticks to match the clean look */}
          <XAxis type="number" hide  className="flex items-center justify-between text-sm font-bold"/>
          
          {/* YAxis displays the text labels */}
          <YAxis 
            dataKey={Y} 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#333', fontSize: 12 }}
            width={60}
            className="flex items-center justify-between text-sm font-bold"
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
              fill: '#000', 
              fontSize: 12,
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