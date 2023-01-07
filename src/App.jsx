import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './components/Home';
import Recipes from './components/Recipes';
import AddNewRecipe from './components/AddNewRecipe';
import SingleRecipe from './components/SingleRecipe';


const App = () => {
  return (
    <BrowserRouter>       
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/Recipes' element={<Recipes />} />
          <Route path='/AddNewRecipe' element={<AddNewRecipe />}></Route>
          <Route path='/SingleRecipe/:id' element={<SingleRecipe />}></Route>
        </Route>
      </Routes>         
    </BrowserRouter>
  );
}

export default App;
