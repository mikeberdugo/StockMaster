import React, { useEffect, useMemo, useState } from 'react'; // Importar React, useMemo, useState, useEffect
import { useTable, usePagination, useFilters } from 'react-table';
import { Navigation } from '../components/Navigation';
import { getAllProducts } from '../api/products.api';

export function Reports() {
    const [products, setProducts] = useState([]);

  // Función para refrescar los productos
  const refreshProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Datos y columnas para la tabla
  const data = useMemo(() => products, [products]);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'name' },
      { Header: 'Precio', accessor: 'price' },
      { Header: 'Descripción', accessor: 'description' },
      // Puedes añadir más columnas según los datos que tengas
    ],
    []
  );

  const Table = () => {
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
      setFilter
    } = useTable(
      { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
      useFilters,
      usePagination
    );

    return (
      <>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={e => setFilter('name', e.target.value)}
          className="mb-4 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-1/4"
        />
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-700 bg-gray-900">
          <thead className="bg-gray-800">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id} // Asigna el key directamente
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-gray-900 divide-y divide-gray-700">
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}> {/* Asigna el key directamente */}
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
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
            onChange={e => setPageSize(Number(e.target.value))}
            className="px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          >
            {[5, 10, 15, 20].map(size => (
              <option key={size} value={size}>
                Mostrar {size}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navigation />
      <div className="flex items-center justify-center h-screen p-4">
        <div className="w-full max-w-6xl mx-auto">
          <p className="text-4xl font-bold mb-6 text-center">Lista de Productos</p>
          <Table />
        </div>
      </div>
    </div>
  );
}


    