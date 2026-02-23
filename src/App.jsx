import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FavoriteRecepies from './pages/FavoriteRecepies';
import RecipeDetails from './pages/RecepieDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './shared/Header'

function App() {
 
  return (
    <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/favorites" element={<FavoriteRecepies/>}/>
    <Route path="/recipe/id" element={<RecipeDetails/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>

   <Header/>
</>

  )
}

export default App
