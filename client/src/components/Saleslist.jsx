import { useEffect, useState } from "react";
import { Navigation } from '../components/Navigation';
import { getAllSales } from "../api/sales.api";
import { Modal } from '../components/SalesCreate';
import { Salestable } from "../components/Salestables";

export function Saleslist() {
    const [sales, setSales] = useState([]);
  
    const refreshSales = async () => {
      const res = await getAllSales();
      setSales(res.data);
    };
  
    useEffect(() => {
      refreshSales();
    }, []);
  return (
    <div className="bg-black min-h-screen text-white">
        <Navigation/>
        <div className="bg-black flex justify-end p-4">
            <Modal refreshSales={refreshSales} />
        </div>
        <div >
            <Salestable sales={sales} refreshSales={refreshSales} />
        </div>
    </div>
  );
}
