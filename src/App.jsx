import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './components/Home';
import Recipes from './components/Recipes';
import SingleRecipe from './components/SingleRecipe';
import Form from './components/Form';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/Recipes' element={<Recipes />} />
          <Route path='/Form' element={<Form />} />
          <Route path='/SingleRecipe/:id' element={<SingleRecipe />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
