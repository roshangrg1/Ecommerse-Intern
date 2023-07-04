
import './App.css';
import Header from './component/layout/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './component/layout/footer/Footer';
import Home from './component/Home/Home'

function App() {
  return (
    <BrowserRouter>

      <Header />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/video/:id' element={''} />
        <Route path='/channel/:id' element={''} />
        <Route path='/search/:searchTerm' element={''} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
