import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './components/Home';
import Recipes from './components/Recipes';
import AddNewRecipe from './components/AddNewRecipe';

const App = () => {
  return (
    <BrowserRouter>       
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/:pageType' element={<Recipes />} />
          <Route path='/AddNewRecipe' element={<AddNewRecipe />}></Route>
        </Route>
      </Routes>         
    </BrowserRouter>
  );
}

export default App;
