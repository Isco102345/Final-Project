import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {

  let { GetLoggedUserCart, UpdateCartQuantity, RemoveSpecificCartItem, ClearUserCart, setNumberItems, numberItems } = useContext(CartContext)
  const [CartDetails, setCartDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false);


  async function getCartItems() {
    setIsLoading(true)
    let response = await GetLoggedUserCart()
    if (response.data.status == "success") {
      setCartDetails(response.data.data)
    }
    setIsLoading(false)
  }

  async function updateProduct(id, count) {
    let response = await UpdateCartQuantity(id, count)
    if (response.data.status == "success") {
      setCartDetails(response.data.data)
      toast.success("Product Updated Successfully")
    }
    else {
      toast.error("Product Can't Add")
    }
  }

  async function removeProduct(id) {
    let response = await RemoveSpecificCartItem(id)
    if (response.data.status == "success") {
      setNumberItems(numberItems - 1)
      setCartDetails(response.data.data)
      toast.success("Product Deleted Successfully")
    }
    else {
      toast.error("Product Can't Remove")
    }
  }

  async function ClearAllItems() {
    let response = await ClearUserCart()
    if (response.data.message == "success") {
      setNumberItems(numberItems = 0)
      setCartDetails(null)
      toast.success("Products Deleted Successfully")
    }
    else {
      toast.error("Products Can't Remove")
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])

  if (isLoading) {
    return <div class="spinner"></div>
  }
  else {
    return <>
      {CartDetails?.products.length > 0 ? <><h2 className='text-center capitalize text-emerald-600 my-4 font-bold text-2xl'>Total Price : {CartDetails?.totalCartPrice}</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CartDetails?.products.map((product) => <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 max-w-full max-h-full"
                    alt="Product item"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  ${product.price * product.count}
                </td>
                <td className="px-6 py-4">
                  <span onClick={() => removeProduct(product.product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                </td>
              </tr>)}

            </tbody>
          </table>
        </div> </> : <h1 className='text-3xl text-center text-red-800 capitalize font-bold my-8 '>No Product Added</h1>}

      {CartDetails?.products.length > 0 ? <button onClick={() => ClearAllItems()} className='btn-clr underline'>Clear Items</button> : null}
      {CartDetails?.products.length > 0 ?
        <Link to={`/Checkout`}>
          <button className='btn my-3'>Checkout</button>
        </Link>
        : null}
    </>
  }
}
