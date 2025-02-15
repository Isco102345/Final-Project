import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css';
import { WishListContext } from '../Context/WishListContext';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';


export default function WishList() {

  let { Getloggeduserwishlist, Removeproductfromwishlist } = useContext(WishListContext)
  const [WishListDetails, setWishListDetails] = useState(null)
  let { addProductToCart, setNumberItems, numberItems } = useContext(CartContext)
  const [Loading, setLoading] = useState(false)
  const [CurrentId, setCurrentId] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  async function GetWhishListItems() {
    setIsLoading(true)
    let res = await Getloggeduserwishlist()
    if (res.data.status == "success") {
      setWishListDetails(res.data.data)
      console.log(res.data.data)
      setIsLoading(false)
    }
  }
  async function removeProduct(id) {
    let res = await Removeproductfromwishlist(id);
    if (res.data.status == "success") {
      console.log(res.data.data)
      setWishListDetails(prevDetails => prevDetails.filter(product => product._id !== id));
      toast.success("Product Deleted Successfully");
    } else {
      toast.error("Product Can't Remove");
    }
  }

  async function buyFromWishList(id) {
    setLoading(true)
    setCurrentId(id)

    let res = await addProductToCart(id)
    setNumberItems(numberItems + 1)
    if (res.data.status == "success") {
      toast.success(res.data.message)
      removeProduct(id)
      setLoading(false)
    }
    else {
      toast.error(res.data.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    GetWhishListItems()
  }, [])

  if (isLoading) {
    return <div class="spinner"></div>
  }

  return <>
    {WishListDetails?.length > 0 ? <><h2 className='text-center capitalize text-emerald-600 my-4 font-bold text-2xl'>Wish List</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Buy $
            </th>
          </tr>
        </thead>
        <tbody>
          {WishListDetails?.map((product) => <tr key={product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product item" />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {product?.title.split(" ").slice(0, 2).join(" ")}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              $ {product?.price}
            </td>
            <td className="px-6 py-4">
              <span onClick={() => removeProduct(product?._id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
            </td>
            <td>
              <button onClick={() => buyFromWishList(product?._id)} className='btn'>
                {Loading && CurrentId == product._id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>  </> : <h1 className='text-3xl text-center text-red-800 capitalize font-bold my-8 '>No Product Added</h1>}

  </>

}
