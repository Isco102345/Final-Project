import React, { useEffect, useState } from 'react'
import style from './Categories.module.css';
import axios from 'axios';
import useProducts from '../../Hooks/useProducts';

export default function Categories() {

  let { isLoading } = useProducts();
  const [Loading, setLoading] = useState(false);

  const [Categories, setCategories] = useState([]);
  const [specificCategories, setspecificCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  function GetAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        console.log(res.data.data)
        setCategories(res.data.data)
      })
      .catch((err) => { console.error(err) });
  }

  function specificcategory(id) {
    setLoading(true); 
    setSelectedCategoryId(id);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then((res) => {
        console.log(res.data.data);
        setLoading(false); 
        setspecificCategories(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  }

  useEffect(() => {
    GetAllCategories();
  }, []);

  return (
    <>
      <div className="row">
        {Categories?.map((Category) => (
          <div key={Category.id} className="w-full md:w-1/3 p-3">
            <div className="group">
              <div onClick={() => specificcategory(Category._id)} className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 group-hover:shadow-lg transition-shadow duration-300">
                <img className="rounded-t-lg w-full h-56 object-cover" src={Category.image} alt="category's card" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-500 dark:text-white">{Category.name}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <div className="row">
          {Loading ? (
            <div className="overlay">
              <div className="spinner"></div>
            </div>
          ) : (
            specificCategories?.map((specific) => (
              <div key={specific._id} className="w-full md:w-1/3 p-3 group cursor-pointer">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5 group-hover:shadow-lg transition-shadow duration-300">
                  <p className="text-center text-emerald-500 text-2xl">{specific.name}</p>
                  <div className="products-list">
                    {specific.products?.map((product) => (
                      <div key={product.id} className="product-item">
                        <h6>{product.name}</h6>
                        <p>{product.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
