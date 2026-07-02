import { ArrowDown, ArrowUp, ArrowUpDown, Funnel, FunnelX, SquareChevronLeft, SquareChevronRight, TextSearch, X } from 'lucide-react';
import  { useState, useMemo, useEffect } from 'react';
import FormField from '../Form/FormField';
import MobileViewCardForTable from './MobileViewCardForTable';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';
import { className, NO_RESULT_FOUND } from '../../utils/constants';
import { useQueryClient } from '@tanstack/react-query';
import FilterModal from '../FilterComponent/FilterModal';
import { filteredTableData } from '../../services/utils.service';
import SortModalComponent from '../SortModal/SortModalComponent';

  export default function CustomTable({list, columnsData, headersData, title}:any) {
    // State configuration
  const queryClient = useQueryClient();
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [txtToBeSearched, setTextToBeSearched] = useState('');
  // const [searchList, setSearchList] = useState(list);
  //
  const [showModal, setShowModal] = useState(false)
  const [isCustomTableFilter, setIsCustomTableFilter] = useState(false)
  const [tableCustomFilterData, setTableCustomFilterData] = useState(queryClient.getQueryData(['filterKeyData']) || new Map())
  const [showSortModal, setSortShowModal] = useState(false)
  
  useEffect(() => {
          // console.log("tableCustomFilterData>>>>",tableCustomFilterData,tableCustomFilterData.size)
          setIsCustomTableFilter(false);
          queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true })
    },[])

     useEffect(() => {
    if (!showModal) return;

    // Save original body overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts or closes
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [showModal]);

    useEffect(() => {
    if (!showSortModal) return;

    // Save original body overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when component unmounts or closes
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [showSortModal]);

  // debounce query
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const timerId = setTimeout(() => {
      // setIsCustomTableFilter(false)
      setDebouncedQuery(txtToBeSearched)
      setCurrentPage(1);
    }, 300)
    return () => clearTimeout(timerId)
  },[txtToBeSearched])

      /**
       * flag based if modal other search otherwise normal sarch
       */
  // Handle Search and Filter
  const searchTable = useMemo(() => {
  let searchableList:any[] = [];
  if(isCustomTableFilter){
      searchableList = filteredTableData(list, tableCustomFilterData);
  }else{
    searchableList = [...list];
  }
  const newList = searchableList?.deepSearchCustomFilter(debouncedQuery)
   return newList;
 }, [list,debouncedQuery,isCustomTableFilter,tableCustomFilterData]);

  // Sorting logic 
  const sortedData = useMemo(() => {
    let sortableItems =  [...searchTable];
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
    // console.log(sortableItems,"<<<<<sortedData")

    return sortableItems;
  }, [list,sortConfig,searchTable]);

  // Pagination computation 
  const totalPages = Math.ceil((sortedData.length) / rowsPerPage);
// console.log(currentPage, "dssvsddvsdv",totalPages)
  
  const paginatedData = useMemo(() => {
    // console.log("sortedData>>>",sortedData)
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage)
  }, [sortedData, currentPage, rowsPerPage]);
 
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

  const openFilterModal = () => {
    setShowModal(true)
    queryClient.setQueryData(['openmodal'], true)
  }

   const openSortModal = () => {
    setSortShowModal(true)
    queryClient.setQueryData(['opensortmodal'], true)
  }

  const closeModal = () => {
    //  setIsCustomTableFilter(false);
     setShowModal(false)
  }

    const closeSortModal = () => {
    //  setIsCustomTableFilter(false);
     setSortShowModal(false)
  }

  const submitFilterData = (data:any) => {
    console.log("In here customtable!!!!!",data)
    queryClient.setQueryData(['filterKeyData'], data)
    const hashMap = new Map(data.map((obj: any) => [obj.key, obj.value]));
    setTableCustomFilterData(hashMap)
    setIsCustomTableFilter(true);
    closeModal()
  }

  const clearAllFilter= () => {
    // console.log("IN hereeeeee clear filter")
    queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true })
    setTableCustomFilterData(new Map())
    setIsCustomTableFilter(false);
    setCurrentPage(1); // Reset index on resize
  }

  return (
    <>    
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-gray-800">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto dark:bg-slate-950 dark:border-none">
        <div className="flex items-center justify-between px-6 py-4 pb-0">
        <h2 className="flex flex-row text-slate-800 dark:text-slate-100 font-semibold text-base  items-center gap-2">
          <Breadcrumb />{title}
        </h2>
        <span className="px-3 py-1
                              rounded-full
                              bg-green-100
                              text-green-700
                               text-xs
                              font-semibold dark:bg-emerald-900/40 dark:text-emerald-400">Total: {list?.length || 0}</span>
      </div>
        <div className='sm:hidden px-6 py-4'>
          <div className='relative'>
              <FormField style={{width:'100%'}} value={txtToBeSearched} className={className} type={"text"} name={"search"} placeholder={"Search..."}  onChange={(e:any) => setTextToBeSearched(e?.target?.value || "")}/>
              {txtToBeSearched && <X width={18} className='cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300' onClick={() => setTextToBeSearched("")}/>}
          </div>
        </div>
      <div className='mt-4 flex flex-row items-center justify-between'>
      <div className='flex-1 justify-between  flex items-center px-6 pb-4'>
        <div className='flex flex-row items-center'>
        <div className='flex justify-center items-center'>
          <label className=' hidden sm:flex text-sm font-bold dark:text-slate-100 pr-2'>Rows / page </label>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}  className="
            cursor-pointer
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
        </div>          
          {<div className='pl-2 flex items-center'><div className='cursor-pointer'>{tableCustomFilterData.size === 0 ? <Funnel className="pl-2 text-gray-600 dark:text-gray-100" onClick={openFilterModal}/> : <FunnelX className="pl-2 text-gray-600 dark:text-gray-100" onClick={openFilterModal}/>} </div><div className='flex sm:hidden'>{<ArrowUpDown className="pl-2 text-gray-600 dark:text-gray-100" onClick={openSortModal} />}</div></div>}
        </div>
        <div className="flex justify-center items-center" >
        {/* <span className='text-xs md:text-sm font-bold dark:text-slate-100 '>{currentPage} / {totalPages || 1}</span> */}
        <button disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
        className={`p-2 transition-colors ${
        currentPage === 1 
          ? 'opacity-40 cursor-not-allowed pointer-events-none  disabled:text-gray-400 dark:disabled:text-gray-100' 
          : 'cursor-pointer text-gray-600 dark:text-gray-100'
      }`}
        >
        <SquareChevronLeft />
        </button>
        <span className='text-xs md:text-sm font-bold  dark:text-slate-100'>{currentPage} / {totalPages || 1}</span>
          <button disabled={currentPage === totalPages || totalPages === 0} 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
           className={`p-2 transition-colors ${
        (currentPage === totalPages || totalPages === 0)
          ? 'opacity-40 cursor-not-allowed pointer-events-none  disabled:text-gray-400 dark:disabled:text-gray-100' 
          : 'cursor-pointer text-gray-600 dark:text-gray-100'
      }`}
          >
          <SquareChevronRight />
          </button>
      </div>
      </div>
      <div className='hidden sm:flex px-6 pb-4'>
          <div className='relative'>
              <FormField  value={txtToBeSearched} className={className} type={"text"} name={"search"} placeholder={"Search..."}  onChange={(e:any) => setTextToBeSearched(e?.target?.value||"")}/>
              {txtToBeSearched && <X width={18} className='cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300' onClick={() => setTextToBeSearched("")}/>}
          </div>
        </div>
      </div>
       <div className='flex flex-col justify-center'>  

      <table className='hidden sm:table rounded-2xl
  shadow-lg
  border
  border-slate-200 m-2.5 dark:bg-slate-900 dark:border-slate-700  dark:shadow-slate-900/50 ' >
        <thead className="bg-slate-100">
          {headersData?.length > 0 && <tr className='cursor-pointer dark:bg-slate-800 dark:border-slate-700'>
            {headersData?.map((header: any, index:number) => {
                return <th key={index+3*index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400" onClick={() => handleSort(header?.key)}>{header?.value} {getSortIcon(header?.key)}</th>
            })}
          </tr>
          }
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {paginatedData?.length > 0 ? paginatedData.map((row,index) =>  <tr key={index+4*index} className=" hover:bg-blue-50 hover:transition-colors hover:duration-200 odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-800" >{Object.keys(columnsData).map((columnsData,id) => <td key={id+6*id} className="px-6 py-4 font-medium text-slate-800 dark:text-slate-400" >{Array.isArray(row[columnsData]) && row[columnsData]?.length > 0 ? row[columnsData].map((item:string, ix:number) => <div key={ix+row[columnsData].length}>{item}</div>) : row[columnsData]}</td>)}</tr>): <tr><td colSpan={8} className="col-span-8  text-center py-8"><h1 className='dark:text-slate-100 text-slate-800 flex flex-row justify-center items-center'><TextSearch className='pr-1'/><span>{NO_RESULT_FOUND}</span></h1></td></tr>}
        </tbody>
      </table>
        <div className='sm:hidden pl-2 pr-2'>
           { paginatedData?.length > 0 ? <MobileViewCardForTable key={paginatedData.length} list={paginatedData} headersData={headersData} /> : <div className='bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2   dark:border-slate-900/50'><h1 className='dark:text-slate-100 text-slate-800'><span className='flex items-center justify-center'><TextSearch className='pr-1'/>{NO_RESULT_FOUND}</span></h1></div>}
        </div>
        </div> 
         </div>
    </div>
    <div  className={`transition-opacity duration-400 ${showModal ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      {<FilterModal closeModal={closeModal} submitFilterData={submitFilterData} clearAllFilter={clearAllFilter}/>}
    </div>
    <div  className={`transition-opacity duration-400 ${showSortModal ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      {<SortModalComponent key={headersData.length} closeSortModal={closeSortModal} headersData={headersData} onSort={(key?: string) =>  handleSort(key)} sortConfig={sortConfig} />}
    </div>
    </>
  );
}

