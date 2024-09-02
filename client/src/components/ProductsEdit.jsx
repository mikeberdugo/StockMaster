import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createProducts , getProducts} from "../api/products.api";
import { useNavigate, useParams } from "react-router-dom";

export function Modaledit({ refreshProducts, productId }) {
  const [showModal, setShowModal] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Cargar los datos del producto cuando se abre el modal
  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        const res = await getProducts(productId);
        const product = res.data;
        // Rellenar el formulario con los datos del producto
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("sku", product.sku);
        setValue("weight", product.weight);
        setValue("description", product.description);
        setValue("dimensions", product.dimensions);
        setValue("stock_alert_level", product.stock_alert_level);
        
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    await updateProduct(productId, data);
    toast.success("Product Updated", {
      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#fff",
      },
    });

    setShowModal(false);
    refreshProducts();  // Llama a la función para actualizar la lista de productos
  });

  return (
    <>
      <button
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Editar Producto
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none fondo">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Editar Producto</h3>
                  <button
                    className="p-1 ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          name="name"
                          placeholder="Nombre del Producto"
                          className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                            errors.name ? "border-red-500" : ""
                          }`}
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <span className="text-red-500 text-sm">
                            Este campo es requerido.
                          </span>
                        )}
                      </div>

                      <div className="mb-3 pt-0">
                        <input
                          type="number"
                          placeholder="Precio"
                          step="0.01"
                          className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                            errors.price ? "border-red-500" : ""
                          }`}
                          {...register("price", { required: true })}
                        />
                        {errors.price && (
                          <span className="text-red-500 text-sm">
                            Este campo es requerido.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          name="sku"
                          placeholder="SKU (Stock Keeping Unit)"
                          className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                            errors.sku ? "border-red-500" : ""
                          }`}
                          {...register("sku", { required: true })}
                        />
                        {errors.sku && (
                          <span className="text-red-500 text-sm">
                            Este campo es requerido.
                          </span>
                        )}
                      </div>

                      <div className="mb-3 pt-0">
                        <input
                          type="number"
                          name="weight"
                          placeholder="Peso del Producto"
                          step="0.01"
                          className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                            errors.weight ? "border-red-500" : ""
                          }`}
                          {...register("weight", { required: true })}
                        />
                        {errors.weight && (
                          <span className="text-red-500 text-sm">
                            Este campo es requerido.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="mb-3 pt-0">
                        <select
                          name="category"
                          className="px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          {...register("category")}
                        >
                          <option value="">Seleccione una Categoría</option>
                          <option value="electronics">Electrónica</option>
                          <option value="furniture">Muebles</option>
                          <option value="clothing">Ropa</option>
                          <option value="books">Libros</option>
                          <option value="home-appliances">Electrodomésticos</option>
                          <option value="toys">Juguetes</option>
                          <option value="sports">Deportes</option>
                          <option value="automotive">Automotriz</option>
                          <option value="health">Salud</option>
                          <option value="beauty">Belleza</option>
                          <option value="garden">Jardín</option>
                          <option value="office">Oficina</option>
                          <option value="pet-supplies">Mascotas</option>
                          <option value="kitchen">Cocina</option>
                          <option value="travel">Viajes</option>
                        </select>
                      </div>

                      <div className="mb-3 pt-0">
                        <select
                          name="brand"
                          className="px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          {...register("brand")}
                        >
                          <option value="">Seleccione una Marca</option>
                          <option value="samsung">Samsung</option>
                          <option value="apple">Apple</option>
                          <option value="sony">Sony</option>
                          <option value="nike">Nike</option>
                          <option value="adidas">Adidas</option>
                          <option value="lg">LG</option>
                          <option value="bosch">Bosch</option>
                          <option value="panasonic">Panasonic</option>
                          <option value="canon">Canon</option>
                          <option value="dell">Dell</option>
                          <option value="hp">HP</option>
                          <option value="lenovo">Lenovo</option>
                          <option value="philips">Philips</option>
                          <option value="microsoft">Microsoft</option>
                          <option value="asus">Asus</option>
                          <option value="puma">Puma</option>
                          <option value="reebok">Reebok</option>
                          <option value="under-armour">Under Armour</option>
                          <option value="vans">Vans</option>
                          <option value="rival">Rival</option>
                          <option value="whirlpool">Whirlpool</option>
                          <option value="zara">Zara</option>
                          <option value="burberry">Burberry</option>
                        </select>
                      </div>
                    </div>


                    <div className="mb-3 pt-0">
                      <textarea
                        name="description"
                        placeholder="Descripción del Producto"
                        className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                          errors.description ? "border-red-500" : ""
                        }`}
                        {...register("description", { required: true })}
                      ></textarea>
                      {errors.description && (
                        <span className="text-red-500 text-sm">
                          Este campo es requerido.
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="mb-3 pt-0">
                        <input
                          type="text"
                          name="dimensions"
                          placeholder="Dimensiones del Producto"
                          className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                            errors.dimensions ? "border-red-500" : ""
                          }`}
                          {...register("dimensions", { required: true })}
                        />
                        {errors.dimensions && (
                          <span className="text-red-500 text-sm">
                            Este campo es requerido.
                          </span>
                        )}
                      </div>

                      <div className="mb-3 pt-0">
                        <input
                          type="number"
                          name="stock_alert_level"
                          placeholder="Nivel de Alerta de Stock"
                          className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${
                            errors.stock_alert_level ? "border-red-500" : ""
                          }`}
                          {...register("stock_alert_level", { required: true })}
                        />
                        {errors.stock_alert_level && (
                          <span className="text-red-500 text-sm">
                            Este campo es requerido.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Actualizar Producto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
