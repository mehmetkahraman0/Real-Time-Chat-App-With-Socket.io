import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from "./redux/store.ts";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

//Pages
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import Home from "./pages/navigatePage/Home.tsx";
import Chat from "./pages/navigatePage/Chat.tsx";
import Chanel from "./pages/chanel/Chanel.tsx";

import { unstableSetRender } from 'antd';
import Settings from './pages/chanel/Settings.tsx';
import About from './pages/navigatePage/About.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hakkımızda" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chanel" element={<Chat />} />
            <Route path="/chanel/:id" element={<Chanel />} />
            <Route path="/chanel/:id/settings" element={<Settings />} />
        </Route>
    )
)

const renderElement = <>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
</>

createRoot(document.getElementById('root')!).render(renderElement);

unstableSetRender((node, container) => {
    const c = container as any;

    c._reactRoot ||= createRoot(container);
    const root = c._reactRoot;

    root.render(node);

    return async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        root.unmount();
    };
});

