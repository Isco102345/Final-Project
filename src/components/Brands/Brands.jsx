import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [specificBrand, setSpecificBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function GetAllBrands() {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => console.error(err));
  }

  function getSpecificBrand(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        setSpecificBrand(res.data.data);
        setIsModalOpen(true);
      })
      .catch((err) => console.error(err));
  }

  function closeModal() {
    setIsModalOpen(false);
    setSpecificBrand(null);
  }

  useEffect(() => {
    GetAllBrands();
  }, []);

  return (
    <div>
      <h1 className='text-emerald-500 text-4xl font-bold'>All Brands</h1>
      <div className="row">
        {brands.map((brand) => (
          <div key={brand.id} className="w-full md:w-1/4 p-5">
            <div className="group">
              <div
                onClick={() => getSpecificBrand(brand._id)}
                className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 group-hover:shadow-lg transition-shadow duration-300"
              >
                <img className="rounded-lg w-full h-56 object-cover" src={brand.image} alt="brand's card" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-emerald-500 dark:text-white">{brand.name}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && specificBrand && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-gray-800 bg-opacity-50 flex"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className='flex justify-between items-center'>
              <div className="p-4 flex flex-col w-1/2">
                <h3 className="mb-5 font-normal text-emerald-500 dark:text-gray-400 text-4xl">{specificBrand?.name}</h3>
                <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{specificBrand?.slug}</p>
              </div>
              <div className='w-full'>
                <img className="w-full h-56 object-cover" src={specificBrand?.image} alt="brand's card" />
              </div>
            </div>
            <button onClick={closeModal} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-emerald-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
