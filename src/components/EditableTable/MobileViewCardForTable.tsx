import type { MobileTableProps } from '../../types/types';
import { bgColors, gradients } from '../../utils/constants';

export default function MobileViewCardForTable({
  list,
  headersData,
}: MobileTableProps) {
  function getRowCss(value: string) {
    let initialCss = `grid grid-cols-2 gap-y-2 text-xs`;
    if (value === 'id') return 'hidden';
    return initialCss;
  }

  return (
    <>
      {list?.map((row: any, index: number) => (
        <div
          key={`${row.id}-${index}`}
          className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2  odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-900/50 "
        >
          {headersData?.map((header: any) => {
            return (
              <div key={header.key}>
                {header?.key === 'name' && (
                  <div className="flex items-center gap-3">
                    <h1
                      className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center dark:bg-none dark:${bgColors[index % bgColors.length]}`}
                    >
                      {row[header?.key]
                        ?.split(' ')
                        .map((n: any) => n[0])
                        .join('')}
                    </h1>
                    <h2 className="pl-2 text-slate-800 dark:text-slate-300">
                      {Array.isArray(row[header?.key]) &&
                      row[header?.key]?.length > 0
                        ? row[header?.key][0]
                        : row[header?.key]}
                    </h2>
                  </div>
                )}
                {header?.key === 'rating' ? (
                  <div className={getRowCss(header?.key)}>
                    <h2 className="text-slate-500">
                      {header?.value
                        ?.split(' ')
                        .map((n: any) => n[0] + n.substring(1).toLowerCase())
                        .join(' ')}
                    </h2>
                    <div className="flex flex-col items-start">
                      <h2
                        className="px-3 py-1
                              rounded-full
                              bg-green-100
                              text-green-700
                               text-xs
                              font-semibold dark:bg-emerald-900/40 dark:text-emerald-400"
                      >
                        {row[header?.key]}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <>
                    {header?.key !== 'name' && (
                      <div className={getRowCss(header?.key)}>
                        <h2 className="text-slate-500">
                          {header?.value
                            ?.split(' ')
                            .map(
                              (n: any) => n[0] + n.substring(1).toLowerCase()
                            )
                            .join(' ')}
                        </h2>
                        <h2 className="pl-2 text-slate-800 dark:text-slate-300">
                          {Array.isArray(row[header?.key]) &&
                          row[header?.key]?.length > 0
                            ? row[header?.key]?.map(
                                (item: string, index: number) => (
                                  <div key={index + row[header?.key].length}>
                                    {item}
                                  </div>
                                )
                              )
                            : row[header?.key]}
                        </h2>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
