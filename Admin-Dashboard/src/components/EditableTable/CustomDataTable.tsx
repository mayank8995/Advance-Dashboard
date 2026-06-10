import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import  { useState, useMemo } from 'react';

export default function CustomDataTable({list}:any) {
  // State configuration
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 1. Sorting logic pipeline
  const sortedData = useMemo(() => {
    let sortableItems = [...list];
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
  }, [list, sortConfig]);

  // 2. Pagination computation pipeline
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
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
    if (sortConfig.key !== key) return <ArrowUpDown className='w-4 h-4 text-slate-400'/>;
     
    return sortConfig.direction === 'asc' ? <ArrowUp className='w-4 h-4 text-slate-400' />  : <ArrowDown className='w-4 h-4 text-slate-400'/>;

  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto">
      <h1 className="text-lg font-bold text-slate-800 px-6 py-4 pb-0">
        Employee Directory
      </h1>

      {/* Rows Per Page Configurator */}
      <div className='px-6 py-4'>
        <label className='text-sm font-bold'>Rows per page: </label>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}  className="
          px-3 py-2
          border
          border-slate-300
          rounded-lg
          bg-white
          text-sm
          shadow-sm
          focus:ring-2
          focus:ring-blue-500
          ">
          <option className='text-sm font-bold' value={2}>2</option>
          <option className='text-sm font-bold' value={3}>3</option>
          <option className='text-sm font-bold' value={5}>5</option>
          <option className='text-sm font-bold' value={10}>10</option>
        </select>
      </div>

      {/* Semantic HTML Table */}
      <table className='rounded-2xl
  shadow-lg
  border
  border-slate-200' >
        <thead className="bg-slate-100">
          <tr className='cursor-pointer'>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"  onClick={() => handleSort('id')}>ID {getSortIcon('id')}</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('name')}>Name {getSortIcon('name')}</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('designation')}>Department {getSortIcon('department')}</th>
            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('yearsOfExperience')} >Years Exp {getSortIcon('yearsOfExperience')}</th>
            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('location')} >Location {getSortIcon('location')}</th>
            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('workMode')} >Work Mode {getSortIcon('workMode')}</th>
            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('rating')} >Rating {getSortIcon('rating')}</th>
            <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600" onClick={() => handleSort('onNoticePeriod')} >Status {getSortIcon('onNoticePeriod')}</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {paginatedData.map((row) => (
            <tr className="hover:bg-blue-50 transition-colors duration-200 odd:bg-white even:bg-slate-50" key={row.id} >
              <td className="px-6 py-4" >{row.id}</td>
              <td className="px-6 py-4 font-medium text-slate-800" >{row.name}</td>
              <td className="px-6 py-4 text-sm text-slate-800" >{row.designation}</td>
              <td className="px-6 py-4 text-sm text-slate-800 hidden sm:table-cell" >{row.yearsOfExperience}</td>
              <td className="px-6 py-4 text-sm text-slate-800 hidden sm:table-cell" >{row.location}</td>
              <td className="px-6 py-4 text-sm text-slate-800 hidden sm:table-cell  " 
                ><div className='px-3 py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            text-xs
                            font-medium'>
                  {row.workMode}
                  </div></td>
              <td className="hidden sm:table-cell px-6 py-4  " 
              ><span className='px-3 py-1
                              rounded-full
                              bg-green-100
                              text-green-700
                               text-xs
                              font-semibold'>⭐{row.rating}</span></td>
              <td className="px-6 py-4 hidden sm:table-cell " 
              >{row.onNoticePeriod ? <span  className="
            bg-red-100
            text-red-700
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
                        ">Yes</span> : <span className="
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ">No</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer Controls */}
      <div className="flex justify-between items-center px-6 py-4" >
        <button 
          className=' px-4 py-2
                    rounded-lg
                    border
                    border-slate-300
                    hover:bg-slate-100'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className='font-medium text-slate-600'>Page {currentPage} of {totalPages || 1}</span>

        <button 
         className=' px-4 py-2
                    rounded-lg
                    border
                    border-slate-300
                    hover:bg-slate-100'
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

const styles:any = {

  td: { padding: '12px' }
};
