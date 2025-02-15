import React from 'react'
import { useQuery } from '@tanstack/react-query'
import  axios  from 'axios';


export default function useProducts() {
 
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
    
      let productInfo = useQuery({
        queryKey: ["recentProducts"],
        queryFn: getProducts,
        staleTime :20000,
        retry : 3,
        retryDelay : 3000,
        gcTime : 4000,
      })
     
      return productInfo
}
