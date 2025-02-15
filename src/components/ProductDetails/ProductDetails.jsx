import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../Context/WishListContext';


export default function ProductDetails() {

  const [Loading, setLoading] = useState(false)
  const [CurrentId, setCurrentId] = useState(0)
  const [likedProducts, setLikedProducts] = useState([]);
  let { addProductToWishList, Removeproductfromwishlist } = useContext(WishListContext)

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const [product, setproduct] = useState(null)
  const [relatedProduct, setrelatedProduct] = useState([])

  let { id, category } = useParams()

  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data)
      })
  }


  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter((product) => product.category.name == category)
        setrelatedProduct(related)
      })
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts()
    const storedLikedProducts = localStorage.getItem("likedProducts");
    try {
      const parsedData = JSON.parse(storedLikedProducts);
      setLikedProducts(Array.isArray(parsedData) ? parsedData : []);
    } catch (error) {
      setLikedProducts([]);
    }
  }, [id, category])

  return (
    <>
      {/* <div className="row items-center">
        <div className='w-1/4'>
          <Slider {...settings}>
            {product?.images.map((src) => <img src={src} className='w-full' />)}
          </Slider>
        </div>
        <div className='w-3/4 p-4 text-left'>
          <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
          <h4 className=' text-gray-700 my-4'>{product?.description}</h4>
          <h4 className=''>{product?.category.name}</h4>
          <div className='flex justify-between p-3 my-5'>
            <span>{product?.price} EGP</span>
            <span>{product?.rateingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
          </div>
          <div className='flex justify-end'>
            <button onClick={() => HeartClick(product?.id)} >
              <i className={`fa-solid fa-heart text-3xl mb-3 ${likedProducts.includes(product?.id) ? 'text-red-500' : ''}`}></i>
            </button>
          </div>
          <button onClick={() => addToCart(product.id)} className='btn'>
            {Loading && CurrentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
          </button>
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <Slider {...settings}>
            {product?.images.map((src, index) => (
              <img key={index} src={src} className="w-full" alt="product" />
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-1/2 lg:w-3/4 p-4 text-left">
          <h3 className="font-semibold capitalize text-2xl">{product?.title}</h3>
          <h4 className="text-gray-700 my-4">{product?.description}</h4>
          <h4 className="">{product?.category.name}</h4>

          <div className="flex justify-between p-3 my-5">
            <span>{product?.price} EGP</span>
            <span>
              {product?.rateingsAverage} <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>

          <div className="flex justify-end">
            <button onClick={() => HeartClick(product?.id)}>
              <i
                className={`fa-solid fa-heart text-3xl mb-3 ${likedProducts.includes(product?.id) ? "text-red-500" : ""
                  }`}
              ></i>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {relatedProduct.length > 0 ? relatedProduct.map((product) => <div key={product.id} >
          <div className="product p-2">
            {/* <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt="product's image" />
              <h3 className=' text-emerald-600'>{product.category.name}</h3>
              <h4 className='mb-3 font-semibold'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span>{product.rateingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
              </div>
              <div className='flex justify-end'>
                <button onClick={() => HeartClick(product?.id)} >
                  <i className={`fa-solid fa-heart mb-3 ${likedProducts.includes(product?.id) ? 'text-red-500' : ''}`}></i>
                </button>
              </div>
            </Link> */}
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`} class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

              <img src={product.imageCover} className='w-full' alt="product's image" />
              <h3 className=' text-emerald-600'>{product.category.name}</h3>
              <h4 className='mb-3 font-semibold'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span>{product.rateingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
              </div>
            </Link>
            <div className='flex justify-center'>
              <button onClick={() => HeartClick(product?.id)} >
                <i className={`fa-solid fa-heart mb-3 ${likedProducts.includes(product?.id) ? 'text-red-500' : ''}`}></i>
              </button>
            </div>
            <button onClick={() => addToCart(product.id)} className='btn'>
              {Loading && CurrentId == product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
            </button>
          </div>
        </div>) : <div class="spinner"></div>}
      </div >
    </>
  )
}
