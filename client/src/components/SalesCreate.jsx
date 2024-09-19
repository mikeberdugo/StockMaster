import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createSale } from "../api/sales.api"; // Asegúrate de tener esta función en tu API
import { getAllProducts } from "../api/products.api"; // Asegúrate de tener esta función en tu API
import { useNavigate } from "react-router-dom";

export function Modal({ refreshSales }) {
    const [showModal, setShowModal] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch products on mount
    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getAllProducts();
                console.log("Fetched Products:", response); // Verifica la respuesta
                const productsData = response.data; // Extrae el array de la propiedad 'data'

                if (Array.isArray(productsData)) {
                    setProducts(productsData);
                } else {
                    console.error("Error: La respuesta no es un array");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createSale(data);
            toast.success("Venta agregada con éxito", {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff",
                },
            });

            setShowModal(false);
            refreshSales();
            reset();
        } catch (error) {
            toast.error("No se pudo agregar la venta. Inténtalo de nuevo.", {
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
                Crear Venta
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none fondo">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Crear Venta</h3>
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
                                                <select
                                                    name="product"
                                                    className={`px-3 py-3 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${errors.product ? "border-red-500" : ""
                                                        }`}
                                                    {...register("product", { required: true })}
                                                >
                                                    <option value="">Selecciona un producto</option>
                                                    {Array.isArray(products) && products.map((product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.product && (
                                                    <span className="text-red-500 text-sm">
                                                        Este campo es requerido.
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-3 pt-0">
                                                <input
                                                    type="number"
                                                    placeholder="Total"
                                                    step="0.01"
                                                    className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${errors.total ? "border-red-500" : ""
                                                        }`}
                                                    {...register("total", { required: true })}
                                                />
                                                {errors.total && (
                                                    <span className="text-red-500 text-sm">
                                                        Este campo es requerido.
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="mb-3 pt-0">
                                                <input
                                                    type="number"
                                                    placeholder="Cantidad"
                                                    className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${errors.quantity ? "border-red-500" : ""
                                                        }`}
                                                    {...register("quantity", { required: true })}
                                                />
                                                {errors.quantity && (
                                                    <span className="text-red-500 text-sm">
                                                        Este campo es requerido.
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-3 pt-0">
                                                <input
                                                    type="number"
                                                    placeholder="Precio Unitario"
                                                    step="0.01"
                                                    className={`px-3 py-3 placeholder-blueGray-300 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${errors.unit_price ? "border-red-500" : ""
                                                        }`}
                                                    {...register("unit_price", { required: true })}
                                                />
                                                {errors.unit_price && (
                                                    <span className="text-red-500 text-sm">
                                                        Este campo es requerido.
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3 pt-0">
                                            <select
                                                name="status"
                                                className={`px-3 py-3 text-black relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${errors.status ? "border-red-500" : ""
                                                    }`}
                                                {...register("status", { required: true })}
                                            >
                                                <option value="">Selecciona un estado</option>
                                                <option value="P">Pendiente</option>
                                                <option value="C">Completada</option>
                                                <option value="A">Cancelada</option>
                                            </select>
                                            {errors.status && (
                                                <span className="text-red-500 text-sm">
                                                    Este campo es requerido.
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Crear
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
