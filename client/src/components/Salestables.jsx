// Salestable.js
import React, { useMemo } from 'react';
import { useTable, usePagination, useFilters } from 'react-table';

export function Salestable({ sales, refreshSales }) {
  const data = useMemo(() => sales, [sales]);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Producto', accessor: 'product.name' },
      { Header: 'Cantidad', accessor: 'quantity' },
      { Header: 'Precio Unitario', accessor: 'unit_price' },
      { Header: 'Total', accessor: 'total' },
      {
        Header: 'Estado',
        accessor: 'status',
        Cell: ({ value }) => (
          <span className={`px-2 py-1 rounded ${getStatusClass(value)}`}>
            {value === 'P' ? 'Pendiente' : value === 'C' ? 'Completada' : 'Cancelada'}
          </span>
        ),
      },
      { Header: 'Fecha', accessor: 'date' },
    ],
    []
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'P':
        return 'bg-yellow-500 text-white'; // Estilo para Pendiente
      case 'C':
        return 'bg-green-500 text-white';  // Estilo para Completada
      case 'A':
        return 'bg-red-500 text-white';    // Estilo para Cancelada
      default:
        return 'bg-gray-500 text-white';   // Estilo por defecto
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setFilter,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useFilters,
    usePagination
  );

  return (
    <div className='h-screen p-4'>
            <>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setFilter('product.name', e.target.value)}
        className="mb-4 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-1/4"
      />
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-700 bg-gray-900">
        <thead className="">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-gray-900 divide-y divide-gray-700">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-4 py-2 text-white bg-red-600 rounded-md disabled:bg-gray-500"
          >
            {'<<'}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 text-white bg-red-600 rounded-md disabled:bg-gray-500"
          >
            {'<'}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 text-white bg-red-600 rounded-md disabled:bg-gray-500"
          >
            {'>'}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="px-4 py-2 text-white bg-red-600 rounded-md disabled:bg-gray-500"
          >
            {'>>'}
          </button>
        </div>
        <div className="text-sm text-gray-400">
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              Mostrar {size}
            </option>
          ))}
        </select>
      </div>
    </>
    </div>



  );
}
