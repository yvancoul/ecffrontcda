import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'

import Add from './pages/Add.tsx'
import FavoriteRecipes from './pages/FavoriteRecipes.tsx';
import RecipeDetail from './components/RecipeDetail.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/add",
    element: <Add/>
  }, {
    path: "/fav",
    element: <FavoriteRecipes/>
  }, {
    path: "/details/:id",
    element: <RecipeDetail/>
  },


])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* stricMode is the one which gives us all the errors in the navigator .  */}
     
    <RouterProvider router={router} />
   
  </React.StrictMode>,
)
