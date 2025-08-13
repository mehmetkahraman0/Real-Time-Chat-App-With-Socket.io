import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from "./redux/store.ts";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

//Pages
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}/>

        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
  <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </>
)
