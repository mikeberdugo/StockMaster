 import { Navigation } from '../components/Navigation';
 import { useNavigate } from 'react-router-dom';
 import React, { useEffect } from 'react';


 export function Index() {
   const navigate = useNavigate();
   useEffect(() => {
      //Comprobar si el token de acceso está presente en el localStorage
     const token = localStorage.getItem('access_token');

     if (localStorage.getItem('access_token') === null) {
        //Redirigir al login si no hay token
       navigate('/');
     } else{
      (async () => {
      try {
          const {data} = await axios.get('http://localhost:8000/home/', {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setMessage(data.message);
      } catch (e) {
          console.log('not auth')
      }
  })()};

   }, [navigate]);
     return (
       <div>
         <Navigation />
         <div className="flex items-center justify-center h-screen">
           <div className="text-center">
             <p className="text-4xl font-bold">Posible panel de control</p>
           </div>
         </div>
       </div>
      
     );
   };


  