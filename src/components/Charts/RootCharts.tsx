




export default function RootCharts({title}: any) {

    return <>
       <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200  dark:bg-gradient-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
         <div className="flex items-center justify-between text-lg font-bold dark:text-slate-100">{title}</div>
         <div  className="overflow-y-auto min-h-0 max-h-[350px]">

        </div>
          </div>
    </>
}