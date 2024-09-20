import React, { useEffect, useMemo, useState } from 'react'; // Importar React, useMemo, useState, useEffect
import { useTable, usePagination, useFilters } from 'react-table';
import { Navigation } from '../components/Navigation';
import { getAllProducts } from '../api/products.api';

export function Reports() {
  return (
    <div>
         <Navigation />
         <div className="flex items-center justify-center h-screen">
           <div className="text-center">
             <p className="text-4xl font-bold">Posible Generador de Informes </p>
           </div>
         </div>
       </div>
  );
}


    