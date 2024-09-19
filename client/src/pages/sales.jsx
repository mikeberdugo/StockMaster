import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Saleslist} from '../components/Saleslist'

export function Sales() {
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar si el token de acceso está presente en el localStorage
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Redirigir al login si no hay token
      navigate('/');
    }
  }, [navigate]);

  return <Saleslist />;
}
