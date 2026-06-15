import { bgColors, gradients } from "../../utils/constants"

export default function MobileViewCardForTable({list, headersData}:any){

    function getRowCss(value: string){
        let initialCss = `px-6 py-2 font-medium text-slate-800 dark:text-slate-100 flex flex-row items-center`
        if(value === 'id') return 'hidden'

        return initialCss
    }

    function getHeaderCss(value: string){
        if( value === 'rating' || value === 'name') return `hidden`
        return `text-slate-500 font-bold dark:text-slate-100 dark:font-bold`
    }
    return<>
        <div>
            {list.map((row:any,index:number) =>  <div key={index+2*index} className="hover:bg-blue-50 transition-colors duration-200 odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-800">{headersData.map((header: any) => {
                return <div className={getRowCss(header?.key)}>
                    <span className={getHeaderCss(header?.key)}>{header?.value?.split(' ').map((n:any) => n[0] + n.substring(1).toLowerCase()).join(' ')}:&nbsp;</span>
                    {header?.key === 'name' && 
                    <div>
                        <h1 className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center dark:bg-none dark:${bgColors[index % bgColors.length]}`}>
                                        {row[header?.key]?.split(' ').map((n: any) => n[0]).join('')}
                                      </h1> 
                        </div>
                        }
                    {header?.key === 'rating' ? <h2 className="px-3 py-1
                              rounded-full
                              bg-green-100
                              text-green-700
                               text-xs
                              font-semibold dark:bg-emerald-900/40 dark:text-emerald-400">{row[header?.key]}</h2> : <h2 className="pl-2 text-slate-800 dark:text-slate-300">{Array.isArray(row[header?.key]) && row[header?.key]?.length > 0 ? row[header?.key][0] : row[header?.key]}</h2>}     
                </div>
                })}</div>)}
        </div>
    </>
}