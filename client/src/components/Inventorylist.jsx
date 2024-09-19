import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import { Navigation } from '../components/Navigation';
import { getAllProducts, updateProductStock } from '../api/products.api'; 

export function Inventorylist() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [newStock, setNewStock] = useState(''); // Estado para el nuevo stock

  const refreshProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const data = useMemo(() => products, [products]);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nombre', accessor: 'name' },
      { Header: 'Precio', accessor: 'price' },
      { Header: 'Descripción', accessor: 'description' },
      {
        Header: 'Stock',
        accessor: 'stock_alert_level',
        Cell: ({ value }) => (
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                value < 5
                  ? 'bg-red-500'
                  : value < 10
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
            />
            <span className="ml-2">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <button
            onClick={() => openModal(row.original)} // Abre el modal pasando el producto seleccionado
            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Actualizar Stock
          </button>
        ),
      },
    ],
    []
  );

  const openModal = (product) => {
    setSelectedProduct(product); // Establece el producto seleccionado
    setNewStock(product.stock_alert_level); // Establece el stock actual
    setShowModal(true); // Muestra el modal
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal
    setSelectedProduct(null); // Limpia el producto seleccionado
    setNewStock(''); // Resetea el estado del stock
  };

  const handleStockUpdate = async () => {
    if (selectedProduct) {
      await updateProductStock(selectedProduct.id, { stock_alert_level: newStock });
      refreshProducts(); // Refresca la lista de productos
      closeModal(); // Cierra el modal
    }
  };

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
      setFilter,
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
          onChange={(e) => setFilter('name', e.target.value)}
          className="mb-4 p-2 border border-gray-600 rounded-md bg-gray-800 text-white w-1/4"
        />
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-700 bg-gray-900">
          <thead className="bg-gray-800">
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
                      key={cell.column.id} // Clave única para cada celda
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
    );
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navigation />
      <div className="flex items-center justify-center h-screen p-4">
        <div className="w-full max-w-6xl mx-auto">
          <p className="text-4xl font-bold mb-6 text-center">Lista de Productos</p>
          <Table />

          {/* Modal para actualizar stock */}
          {showModal && (
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className=" p-6 rounded-md w-96 fondo">
                <h3 className="text-xl mb-4">Actualizar Stock</h3>
                <p>Producto: {selectedProduct?.name}</p>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-4 fondo"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeModal}
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleStockUpdate}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
