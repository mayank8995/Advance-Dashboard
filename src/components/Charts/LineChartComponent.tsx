import {  CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function LineChartComponent({data,title, X, Y, name}: any) {

    return <>
           <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200  dark:bg-gradient-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
        <div className="flex items-center justify-between text-lg font-bold dark:text-slate-100">{title}</div>
                                <div  className="overflow-y-auto min-h-0 max-h-[350px]">
        <LineChart  key={4364578686} style={{ width: '100%', height: '100%', aspectRatio: 1 }} responsive data={data}>
                  <CartesianGrid stroke="#8884d8" strokeDasharray="5 5"  style={{outline:"none"}} />
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
                    name={name}
                  />
            <Legend align="right" />
                  <Tooltip />
                </LineChart>
                </div>
                </div>
    </>
}