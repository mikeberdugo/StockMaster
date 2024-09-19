import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createProducts } from "../api/products.api";
import { useNavigate, useParams } from "react-router-dom";

export function Modal({ refreshProducts }) {
  const [showModal, setShowModal] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createProducts(data);
      toast.success("Producto agregado con éxito", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });

      setShowModal(false);
      refreshProducts(); 
      reset(); 
    } catch (error) {
      toast.error("No se pudo agregar el producto. Inténtalo de nuevo.", {
        position: "bottom-right",
        style: {
          background: "#e74c3c", // Rojo oscuro
          color: "#fff", // Blanco para el texto
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      console.error(error);
    }
  });

  return (
    <>
      <button
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Crear Producto
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none fondo">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Crear Producto</h3>
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
                          placeholder="Stock del Producto" 
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
                        Guardar Producto
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