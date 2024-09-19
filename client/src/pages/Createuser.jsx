import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import {Createuser} from '../api/createuser.api'



export function Register() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Capturamos el valor actual de la contraseña y de la confirmación de contraseña
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  // Funciones para validar en tiempo real
  const validateLength = password.length >= 8;
  const validateUpperCase = /[A-Z]/.test(password);
  const validateSpecialChar = /[!@#$%^&*]/.test(password);
  const validateMatch = password === confirmPassword;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true); // Activar el estado de carga
    try {
      const response = await Createuser(data);
      navigate('/');
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu cuenta ha sido creada con éxito.',
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
        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Crear Cuenta</h5>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              placeholder="Username"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.username ? 'border-red-500' : ''}`}
              {...register('username', { required: 'El nombre de usuario es requerido.' })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
              {...register('email', { required: 'El email es requerido.' })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.password ? 'border-red-500' : ''}`}
              {...register('password', {
                required: 'La contraseña es requerida.',
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}

            {/* Validación en tiempo real */}
            <div className="mt-2">
              <p className={`text-sm ${validateLength ? 'text-green-500' : 'text-red-500'}`}>
                {validateLength ? '✔ ' : '✖ '} Al menos 8 caracteres
              </p>
              <p className={`text-sm ${validateUpperCase ? 'text-green-500' : 'text-red-500'}`}>
                {validateUpperCase ? '✔ ' : '✖ '} Al menos una letra mayúscula
              </p>
              <p className={`text-sm ${validateSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
                {validateSpecialChar ? '✔ ' : '✖ '} Al menos un carácter especial (!@#$%^&*)
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.confirmPassword ? 'border-red-500' : ''}`}
              {...register('confirmPassword', {
                validate: value => value === password || 'Las contraseñas no coinciden.',
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
            )}
            <p className={`text-sm ${validateMatch ? 'text-green-500' : 'text-red-500'}`}>
              {validateMatch ? '✔ ' : '✖ '} Las contraseñas coinciden
            </p>
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
              'Crear Cuenta'
            )}
          </button>
        </form>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
            ¿Ya tienes una cuenta?
            <Link to="/" className="text-red-700 hover:underline dark:text-red-500">
                Iniciar sesión
            </Link>
        </div>
      </div>
    </div>
  );
}
