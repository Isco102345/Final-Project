import React, { useContext, useState } from 'react';
import style from './NavBar.module.css';
import logo from '../../assets/freshcart-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext.jsx';
import { CartContext } from '../Context/CartContext.jsx';

export default function NavBar() {
  let { numberItems } = useContext(CartContext);
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-slate-300 fixed top-0 right-0 left-0 border-gray-200 z-50">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">

        <div className="flex items-center">
          <Link to="" className="flex items-center">
            <img src={logo} width="140px" className="h-8" alt="Flowbite Logo" />
          </Link>
        </div>

        <div className={`absolute md:static top-16 left-0 right-0 bg-slate-300 md:bg-transparent ${isOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto p-4 md:p-0`}>
          <ul className='flex flex-col md:flex-row gap-5 text-left items-start w-full md:w-auto pl-4'>
            <li><Link className={`text-slate-600 ${isOpen ? 'nav-box' : null}`} to="">Home</Link></li>
            <li><Link className={`text-slate-600 relative ${isOpen ? 'nav-box' : null}`} to="Cart">Cart
              <div className='absolute text-white bg-emerald-600 rounded-full top-[-10px] right-[-13px] size-5 flex justify-center items-center'>{numberItems}</div>
            </Link></li>
            <li><Link className={`text-slate-600 relative ${isOpen ? 'nav-box' : null}`} to="WishList">Wish List</Link></li>
            <li><Link className={`text-slate-600 ${isOpen ? 'nav-box' : null}`} to="Products">Products</Link></li>
            <li><Link className={`text-slate-600 ${isOpen ? 'nav-box' : null}`} to="Categories">Categories</Link></li>
            <li><Link className={`text-slate-600 ${isOpen ? 'nav-box' : null}`} to="Brands">Brands</Link></li>
          </ul>
        </div>


        <div className="flex items-center gap-6">
          <ul className='flex flex-row items-center gap-4'>
            <li><i className='fab fa-facebook'></i></li>
            <li><i className='fab fa-youtube'></i></li>
            <li><i className='fab fa-instagram'></i></li>
            <li><i className='fab fa-linkedin'></i></li>
            <li><i className='fab fa-twitter'></i></li>
          </ul>

          <ul className='flex flex-row gap-5'>
            {userLogin != null ? (
              <span onClick={signout} className='cursor-pointer'>Signout</span>
            ) : (
              <>
                <Link to="Login">Login</Link>
                <Link to="Register">Register</Link>
              </>
            )}
          </ul>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-cta"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

      </div>
    </nav>

  );
}
