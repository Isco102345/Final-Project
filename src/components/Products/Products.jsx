import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';

export default function Products() {

  const [Loading, setLoading] = useState(false)
  const [CurrentId, setCurrentId] = useState(0)
  const [likedProducts, setLikedProducts] = useState([]);
  let { addProductToWishList, Removeproductfromwishlist } = useContext(WishListContext)


  useEffect(() => {
    const storedLikedProducts = localStorage.getItem("likedProducts");
    try {
      const parsedData = JSON.parse(storedLikedProducts);
      setLikedProducts(Array.isArray(parsedData) ? parsedData : []);
    } catch (error) {
      setLikedProducts([]);
    }
  }, []);

  let { addProductToCart, setNumberItems, numberItems } = useContext(CartContext)
  async function addToCart(id) {

    setLoading(true)
    setCurrentId(id)

    let response = await addProductToCart(id)

    if (response.data.status == "success") {
      setNumberItems(numberItems + 1)
      toast.success(response.data.message)
      setLoading(false)
    }
    else {
      toast.error(response.data.message)
      setLoading(false)
    }
  }

  let { data, isError, isLoading, error } = useProducts()
  if (isError) {
    return <h3>{error}</h3>
  }

  if (isLoading) {
    return <div class="spinner"></div>
  }


  // async function HeartClick(productId) {
  //   if (likedProducts.includes(productId)) {
  //     let res = await Removeproductfromwishlist(productId);
  //     if (res.data.status === "success") {
  //       setLikedProducts(prev => prev.filter(id => id !== productId));
  //       toast.success(res.data.message)
  //     } else {
  //       toast.error(res.data.message)
  //     }
  //   } else {
  //     let res = await addProductToWishList(productId);
  //     if (res.data.status === "success") {
  //       setLikedProducts(prev => [...prev, productId]);
  //       toast.success(res.data.message)
  //     } else {
  //       toast.error(res.data.message)
  //     }
  //   }
  // }


  async function HeartClick(productId) {
    let updatedLikes = Array.isArray(likedProducts) ? [...likedProducts] : [];

    if (updatedLikes.includes(productId)) {
      let res = await Removeproductfromwishlist(productId);
      if (res.data.status === "success") {
        updatedLikes = updatedLikes.filter(id => id !== productId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        return;
      }
    } else {
      let res = await addProductToWishList(productId);
      if (res.data.status === "success") {
        updatedLikes.push(productId);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        return;
      }
    }

    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
  }

  return (
    <>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              {data?.data?.data.map((product) => (
                <div key={product.id} className="p-2">
                  <div className="product p-4 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                    <Link
                      to={`/ProductDetails/${product.id}/${product.category.name}`}
                      className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img src={product.imageCover} className="w-full mb-2" alt="product's image" />
                      <h3 className="text-emerald-600">{product.category.name}</h3>
                      <h4 className="mb-3 font-semibold">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h4>
                      <div className="flex justify-between p-3">
                        <span>{product.price} EGP</span>
                        <span>
                          {product.rateingsAverage} <i className="fas fa-star text-yellow-400"></i>
                        </span>
                      </div>
                    </Link>
        
                    <div className="flex justify-center">
                      <button onClick={() => HeartClick(product?.id)}>
                        <i className={`fa-solid fa-heart mb-3 ${likedProducts.includes(product?.id) ? 'text-red-500' : ''}`}></i>
                      </button>
                    </div>
        
                    <button onClick={() => addToCart(product.id)} className="btn">
                      {Loading && CurrentId == product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "Add To Cart"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
    </>
  )
}

