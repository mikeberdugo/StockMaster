import {Modaledit} from '../components/ProductsEdit'

export function ProductsCard( {product , refreshProducts}) {
    return (
        
    <div key = {product.id}  className="hover:cursor-pointer">
        <br />
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"  >
        <div className="flex justify-end px-4 pt-4">
            <div className="flex justify-end p-4 bg-gray-100" key = {product.id}>
                <Modaledit refreshProducts={refreshProducts} productId={product.id} />
            </div>   
        </div>
        <div className="flex flex-col items-center pb-10">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{ product.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{ product.description}</span>
                
        </div>
    </div>
    </div>
    );
};
  
  