import './App.css';
import { Toaster } from "@/lib/toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Compare from "./pages/Compare";
import ProductDetails from "./pages/ProductDetails";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Router>
  <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-600">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8 mt-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App
