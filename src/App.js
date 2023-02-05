import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home.tsx';
import Menu from './components/menu/Menu';
import Cart from './components/cart/Cart';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/menu" element={<Menu/>} ></Route>
          <Route path="/cart" element={<Cart/>} ></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
