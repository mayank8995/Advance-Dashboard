import { ArrowDown, ArrowUp, ArrowUpDown, SquareChevronLeft, SquareChevronRight, X } from 'lucide-react';
import  { useState, useMemo, useEffect } from 'react';
import FormField from '../Form/FormField';
import MobileViewCardForTable from './MobileViewCardForTable';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';
import { className, NO_RESULT_FOUND } from '../../utils/constants';

export default function CustomTable({list, columnsData, headersData, title}:any) {
  // State configuration
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [txtToBeSearched, setTextToBeSearched] = useState('');
  const [searchList, setSearchList] = useState(list);

  //
    const [cols, setColumn] = useState(columnsData);
    const [headers, setHeaders] = useState(headersData);

    useEffect(() => {
        // console.log(columnsData,headersData,list)
        setColumn(columnsData);
        setHeaders(headersData)
    })


  //

  useEffect(() => {
    if(list?.length > 0) setSearchList(list)
    else setSearchList([])
  })

  // Handle Search
  const searchTable = useMemo(() => {
   let searchableList = [...searchList];
   const newList = searchableList?.deepSearchCustomFilter(txtToBeSearched)
   return newList;
 }, [searchList,txtToBeSearched,sortConfig]);

  // Sorting logic 
  const sortedData = useMemo(() => {
    let sortableItems = [...searchTable];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [searchList, sortConfig,searchTable]);

  // Pagination computation 
  const totalPages = Math.ceil((sortedData.length) / rowsPerPage);
console.log(currentPage, "dssvsddvsdv",totalPages)
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage)
  }, [sortedData, currentPage, rowsPerPage,searchTable]);
 
  // Handler functions
  const handleSort = (key: any) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset index on sort
  };

  const handleRowsPerPageChange = (e: any) => {
    setRowsPerPage(Number(e?.target?.value));
    setCurrentPage(1); // Reset index on resize
  };

  const getSortIcon = (key: any) => {
    if (sortConfig.key !== key) return <ArrowUpDown className='w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400'/>;  
    return sortConfig.direction === 'asc' ? <ArrowUp className='w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400' />  : <ArrowDown className='w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400'/>;
  };

  const handleTableSearch = (e: any) => {
    setTextToBeSearched(e?.target?.value || "");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-gray-800">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto dark:bg-slate-950 dark:border-none">
        <div className="flex items-center justify-between px-6 py-4 pb-0">
        <h2 className="flex flex-row text-slate-800 dark:text-slate-100 font-semibold text-base flex items-center gap-2">
          <Breadcrumb />{title}
        </h2>
        <span className="text-slate-400 text-xs">{list?.length || 0} projects</span>
      </div>
        <div className='sm:hidden px-6 py-4'>
          <div className='relative'>
              <FormField style={{width:'100%'}} value={txtToBeSearched} className={className} type={"text"} name={"search"} placeholder={"Search..."}  onChange={handleTableSearch}/>
              {txtToBeSearched && <X width={18} className='absolute bottom-0 right-[6px] top-[10px] dark:text-slate-300' onClick={() => setTextToBeSearched("")}/>}
          </div>
        </div>
      {/* Rows Per Page Configurator */}
      <div className='flex flex-row items-center justify-between'>
      <div className='flex items-center px-6 pb-4'>
        <label className='text-sm font-bold dark:text-slate-100 pr-2'>Rows / page </label>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}  className="
          px-2 py-1
          border
          border-slate-300 dark:border-slate-700
          rounded-lg
          bg-white dark:bg-slate-800
          text-sm
          shadow-sm
          focus:ring-2
          focus:ring-blue-500 dark:text-slate-300
          dark:outline-none dark:focus:outline-none
          ">
          <option className='text-sm font-bold outline-none' value={2}>2</option>
          <option className='text-sm font-bold outline-none' value={3}>3</option>
          <option className='text-sm font-bold outline-none' value={5}>5</option>
          <option className='text-sm font-bold outline-none' value={10}>10</option>
        </select>
        <div className="sm:hidden flex justify-center items-center px-6 py-0" >
        <span className='text-xs md:text-sm font-bold dark:text-slate-100 '>Page {currentPage} / {totalPages || 1}</span>
        <button disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
        className={`p-2 transition-colors ${
        currentPage === 1 
          ? 'opacity-40 cursor-not-allowed pointer-events-none disabled:text-gray-400 dark:disabled:text-gray-100' 
          : 'cursor-pointer text-gray-950 dark:text-gray-100'
      }`}
        >
        <SquareChevronLeft />
        </button>
          <button disabled={currentPage === totalPages || totalPages === 0} 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
           className={`p-2 transition-colors ${
        (currentPage === totalPages || totalPages === 0)
          ? 'opacity-40 cursor-not-allowed pointer-events-none disabled:text-gray-400 dark:disabled:text-gray-100' 
          : 'cursor-pointer text-gray-950 dark:text-gray-100'
      }`}
          >
          <SquareChevronRight />
          </button>
      </div>
      </div>
      <div className='hidden sm:flex px-6 pb-4'>
          <div className='relative'>
              <FormField  value={txtToBeSearched} className={className} type={"text"} name={"search"} placeholder={"Search..."}  onChange={handleTableSearch}/>
              {txtToBeSearched && <X width={18} className='absolute bottom-0 right-[6px] top-[10px] dark:text-slate-300' onClick={() => setTextToBeSearched("")}/>}
          </div>
        </div>
      </div>
       <div className='flex flex-col justify-center'>  


      {/* Semantic HTML Table */}
      <table className='hidden sm:table rounded-2xl
  shadow-lg
  border
  border-slate-200 m-[10px] dark:bg-slate-900 dark:border-slate-700  dark:shadow-slate-900/50 ' >
        <thead className="bg-slate-100">
          {headers?.length > 0 && <tr className='cursor-pointer dark:bg-slate-800 dark:border-slate-700'>
            {headers?.map((header: any, index:number) => {
                return <th key={index+3*index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400" onClick={() => handleSort(header?.key)}>{header?.value} {getSortIcon(header?.key)}</th>
            })}
          </tr>
          }
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {paginatedData?.length > 0 ? paginatedData.map((row,index) =>  <tr key={index+4*index} className=" hover:bg-blue-50 hover:transition-colors hover:duration-200 odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-800" >{Object.keys(cols).map((col) => <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-400" >{Array.isArray(row[col]) && row[col]?.length > 0 ? row[col][0] : row[col]}</td>)}</tr>): <tr><td colSpan={8} className="col-span-8  text-center py-8"><h1 className='dark:text-slate-100 text-slate-800'>{NO_RESULT_FOUND}</h1></td></tr>}
        </tbody>
      </table>
        <div className='sm:hidden pl-[8px] pr-[8px]'>
           { paginatedData?.length > 0 ? <MobileViewCardForTable list={paginatedData} headersData={headers} /> : <div className='flex flex-col items-center dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-800'><h1 className='dark:text-slate-100 text-slate-800'>{NO_RESULT_FOUND}</h1></div>}
        </div>
        </div> 

      {/* Pagination Footer Controls */}
      <div className="hidden sm:flex justify-between items-center px-6 py-4" >
        <button 
          className=' px-6 py-2.5
                        bg-gradient-to-r from-indigo-600 to-violet-600
                        text-white font-semibold text-xs md:text-sm
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                        hover:enabled:from-indigo-700 hover:enabled:to-violet-700
                        transition-all duration-200
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className='text-xs md:text-sm font-bold dark:text-slate-100 '>Page {currentPage} / {totalPages || 1}</span>

        <button 
         className='px-6 py-2.5
                        bg-gradient-to-r from-indigo-600 to-violet-600
                        text-white font-semibold text-xs md:text-sm
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                        hover:enabled:from-indigo-700 hover:enabled:to-violet-700
                        transition-all duration-200
                        cursor-pointer  disabled:text-gray-400 disabled:cursor-not-allowed'
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
         </div>
    </div>
  );
}

