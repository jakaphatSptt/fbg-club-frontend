import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home'
import { Admin, AdCustomers, AdGames } from './Admin'
import Game from './Game'
import Games from './Games'
import GameManage from './GamesManage'
import Customer from './Customer'
import Login from './login';
import Form from './Form'
import { FormGeneralA, FormImageA, FormTutorialA } from '../components/form/createForm';
import { FormGeneralB, FormImageB, FormTutorialB } from '../components/form/editForm';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:"/games",
    element: <Games />
  },
  {
    path:"/customer/:id",
    element: <Customer/>
  },
  {
    path:"/game/:id",
    element: <Game />
  },
  {
    path:"/admin",
    element: <Admin />,
    children:[
      {
        path:"customers",
        element: <AdCustomers/>
      },
      {
        path:"games",
        element: <AdGames/>
      }
    ]
  },
  {
    path:"/games/manage",
    element: <GameManage />
  },
  {
    path:"/new_customer",
    element: <><h1>new Customers</h1></>
  },
  {
    path:"/game/create",
    element: <Form type={"Create"} />,
    children:[
      {
        path:"general",
        element:<FormGeneralA/>
      },
      {
        path:"image",
        element:<FormImageA/>
      },
      {
        path:"tutorial",
        element:<FormTutorialA/>
      }
    ]
  },
  {
    path:"game/:id/edit/",
    element: <Form type={"Edit"} />,
    children:[
      {
        path:"general",
        element:<FormGeneralB/>
      },
      {
        path:"image",
        element:<FormImageB/>
      },
      {
        path:"tutorial",
        element:<FormTutorialB/>
      }
    ]
  },
  {
    path:"/delete/game/:id",
    element: <><h1>delete</h1></>
  },
  {
    path:"/login",
    element: <Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
