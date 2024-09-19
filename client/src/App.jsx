
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import { Login } from './pages/login'
import { Index } from './pages/index'
import { Navigation } from './components/Navigation';
import { Products } from './pages/products'
import {Inventory } from './pages/inventary'
import {Sales } from './pages/sales'
import {Reports } from './pages/reports'
import { Toaster } from 'react-hot-toast';
import { Register} from './pages/Createuser'
import { Logout } from "./pages/logout"; 



const app = () => {
  return (

    <BrowserRouter>
    <div className='container mx-auto'>
        <Routes>
          <Route path='/' element={< Login />} /> 
          <Route path='/Create/user' element={< Register />} /> 
          <Route path='/Index' element={< Index />} /> 
          <Route path='/products' element={< Products />} /> 
          <Route path='/inventory' element={< Inventory />} /> 
          <Route path='/sales' element={< Sales />} /> 
          <Route path='/reports' element={< Reports />} /> 
          <Route path='/logout' element={< Logout />} /> 
        </Routes>
        <Toaster />
    </div>
      
    </BrowserRouter>

  );
};

export default app;
