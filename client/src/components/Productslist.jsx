import { useEffect, useState } from "react";
import { getAllProducts } from '../api/products.api';
import { ProductsCard } from './ProductsCard';
import { Modal } from '../components/ProductsCreate';

export function Productslist() {
  const [products, setProducts] = useState([]);

  const refreshProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-end p-4 bg-gray-100 fondo">
        <Modal refreshProducts={refreshProducts} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {products.map((product, index) => (
          <ProductsCard key={index} product={product}  refreshProducts={refreshProducts} />
        ))}
      </div>
    </div>
  );
}
