
import { Legend, Pie, PieChart, Sector, Tooltip, type PieSectorShapeProps } from "recharts";
import { PIE_COLORS } from "../../utils/constants";
import { useTheme } from "../../hooks/useTheme";


const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={PIE_COLORS[props.index % PIE_COLORS.length]} />;
};


export default function PieChartComponent({data,title, X, Y}: any) { 

    const {theme: themeMode} = useTheme()
    const RenderCustomLegend = () => {
  return (
    <div>
      {data?.length > 0 && data.map((entry: any, index: any) => {
        const itemColor = PIE_COLORS[index % PIE_COLORS.length]
        return (
          <div key={entry[X]} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: itemColor }} />
            <span style={{ fontSize: '14px', color: themeMode === 'dark' ? '#f3f4f6' : '#333' }}>{entry[X]}</span>
          </div>
        );
      })}
    </div>
  );
};


    return <>
     <div className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
    <div className="flex items-center justify-between text-lg font-bold dark:text-slate-100">{title}</div>
                                <div  className="overflow-y-auto min-h-0 max-h-87.5">
          <PieChart style={{ width: '100%', height: '100%', aspectRatio: 1 }} responsive>
          <Pie
            data={data}
            dataKey={Y}
            nameKey={X}
            isAnimationActive={true}
            shape={MyCustomPie}
            labelLine={true}
            style={{outline:"none"}}
          />
          <Tooltip  />
          <Legend layout="vertical" align="right" verticalAlign="top" content={RenderCustomLegend} /> 
    
               </PieChart>
               </div>
    </div>
    </>
}