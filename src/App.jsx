import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import UserContextProvider from './components/Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import OrderDetails from './components/OrderDetails/OrderDetails';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './components/Context/WishListContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Verify from './components/Verify/Verify';
import ResetPassword from './components/ResetPassword/ResetPassword';


let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "WishList", element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: "Products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "Checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "AllOrders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "OrderDetails/:id", element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
      { path: "Categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "ProductDetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "Brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "ForgotPassword", element: <ForgotPassword /> },
      { path: "Verify", element: <Verify /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={x}></RouterProvider>
          </WishListContextProvider>
          <Toaster />
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
