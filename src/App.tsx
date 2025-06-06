import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App(){
  return (
<>
<Header />
        <main>
          <Outlet />
          <ToastContainer />
        </main>
        <Footer />
</>
        

  );
}

export default App;
