import {
  Legend,
  Pie,
  PieChart,
  Sector,
  Tooltip,
  type PieSectorShapeProps,
} from 'recharts';
import { PIE_COLORS } from '../../utils/constants';
import { useTheme } from '../../hooks/useTheme';

const MyCustomPie = (props: PieSectorShapeProps) => {
  return (
    <Sector {...props} fill={PIE_COLORS[props.index % PIE_COLORS.length]} />
  );
};

export default function PieChartComponent({ data, title, X, Y }: any) {
  const { theme: themeMode } = useTheme();
  const RenderCustomLegend = () => {
    return (
      <div className="grid grid-cols-2">
        {data?.length > 0 &&
          data?.map((entry: any, index: any) => {
            const itemColor = PIE_COLORS[index % PIE_COLORS.length];
            return (
              <div
                key={entry[X]}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    backgroundColor: itemColor,
                  }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    color: themeMode === 'dark' ? '#f3f4f6' : '#333',
                  }}
                >
                  {entry[X]}
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <div className="overflow-hidden bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
        <div className="flex items-center justify-between text-lg font-bold dark:text-slate-100">
          {title}
        </div>
        <div className="overflow-y-auto min-h-0 max-h-87.5">
          <PieChart
            style={{ width: '100%', height: '100%', aspectRatio: 1 }}
            responsive
          >
            <Pie
              data={data}
              dataKey={Y}
              nameKey={X}
              isAnimationActive={true}
              shape={MyCustomPie}
              labelLine={true}
              style={{ outline: 'none' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '10px 14px',
                boxShadow:
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
              // 2. Style the header / label text (e.g., "Jan", "Feb")
              labelStyle={{
                fontWeight: 600,
                color: '#1E293B',
                fontSize: '14px',
                marginBottom: '4px',
                letterSpacing: '0.05em',
              }}
              // 3. Style the row containers for the items
              itemStyle={{
                fontSize: '13px',
                padding: '3px 0',
                color: '#475569',
              }}
              // 4. Format the raw number values (adds currency formatting)
              // formatter={(value: any) => {
              //   const formattedValue = new Intl.NumberFormat('en-IN').format(
              //     value
              //   );
              //   return [formattedValue];
              // }}
              // 5. Clean up the hover cursor guide line
              cursor={{ fill: 'transparent' }}
            />
            <Legend
              layout="horizontal"
              align="right"
              verticalAlign="bottom"
              content={RenderCustomLegend}
            />
          </PieChart>
        </div>
      </div>
    </>
  );
}
