import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Validationuser } from '../api/login.api';
import { Link } from "react-router-dom";
import axios from 'axios';


export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true); // Activar el estado de carga
    try {
      const response = await Validationuser(data);
      // Guarda el token en localStorage
      console.log(response)
      localStorage.clear();
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response['access']}`;


      navigate('/index');
      Swal.fire({
        icon: 'success',
        title: 'Ingreso Exitoso',
        text: '¡Hola! Bienvenido a bordo, donde hasta las aventuras más locas parecen tener sentido (más o menos ). ¡Abróchate el cinturón y disfruta del viaje!',
        background: '#101010',
        color: '#fff',
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.detail,
          background: '#101010',
          color: '#fff',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
          background: '#101010',
          color: '#fff',
        });
      }
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Inicia Sesión</h5>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              placeholder="Username"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.username ? 'border-red-500' : ''}`}
              {...register('username', { required: true })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">Este campo es requerido.</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.password ? 'border-red-500' : ''}`}
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Este campo es requerido.</span>
            )}
          </div>
          <button
            type="submit"
            className={`w-full text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'} focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
            disabled={isLoading} // Desactivar el botón mientras se carga
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg className="w-5 h-5 mr-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Cargando...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
          ¿No estás registrado? 
          <Link to="/Create/user" className="text-red-700 hover:underline dark:text-red-500">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
