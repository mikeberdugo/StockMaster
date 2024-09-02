
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import { Login } from './pages/login'
import { Index } from './pages/index'
import { Navigation } from './components/Navigation';
import { Products } from './pages/products'


const app = () => {
  return (

    <BrowserRouter>
    <div className='container mx-auto'>
      <Navigation/>
        <Routes>
          <Route path='/Index' element={< Index />} /> 
          <Route path='/products' element={< Products />} /> 
        </Routes>
    </div>
      
    </BrowserRouter>

  );
};

export default app;
