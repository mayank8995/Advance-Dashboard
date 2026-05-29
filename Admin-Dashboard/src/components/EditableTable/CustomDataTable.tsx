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
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset index on resize
  };

  const getSortIcon = (key: any) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '🔼' : '🔽';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Custom Employee Directory</h2>

      {/* Rows Per Page Configurator */}
      <div style={{ marginBottom: '15px' }}>
        <label>Rows per page: </label>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* Semantic HTML Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            <th onClick={() => handleSort('id')} style={styles.th}>ID {getSortIcon('id')}</th>
            <th onClick={() => handleSort('name')} style={styles.th}>Name {getSortIcon('name')}</th>
            <th onClick={() => handleSort('designation')} style={styles.th}>Department {getSortIcon('department')}</th>
            <th onClick={() => handleSort('yearsOfExperience')} style={styles.th}>Years Exp {getSortIcon('yearsOfExperience')}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={styles.td}>{row.id}</td>
              <td style={styles.td}>{row.name}</td>
              <td style={styles.td}>{row.designation}</td>
              <td style={styles.td}>{row.yearsOfExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer Controls */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages || 1}</span>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles:any = {
  th: { padding: '12px', cursor: 'pointer', userSelect: 'none' },
  td: { padding: '12px' }
};
