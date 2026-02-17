import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";
import Navbar from "./pages/auth/Navbar.tsx";

function App() {
  return (
    <>
    <ToastContainer />
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  )
}

export default App
