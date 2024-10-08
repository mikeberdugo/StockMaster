import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Productslist } from '../components/Productslist';

export function Products() {
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar si el token de acceso está presente en el localStorage
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Redirigir al login si no hay token
      navigate('/');
    }
  }, [navigate]);

  return <Productslist />;
}
