import { Link } from "react-router-dom";


export function Navigation() {
  return (
    <div className="flex flex-wrap py-2">
      <div className="w-full px-4">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-red-500 rounded">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <Link to="/Index" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">StockMaster</span>
              </Link>
            </div>

            <div className="flex lg:flex-grow items-center" id="example-navbar-info">
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <Link to="/products" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Gestión de Productos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/inventory" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Control de Inventario
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/sales" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Ventas
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/reports" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Reportes
                  </Link>
                </li>

                {/* Agregamos el botón de Logout */}
                <li className="nav-item">
                  <Link to="/logout" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    Cerrar sesion
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
