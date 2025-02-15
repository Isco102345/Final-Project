import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAllOrders , getUserOrders } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllOrders()
      .then((data) => {
        console.log(data)
        setOrders(data?.data);
      })
      .catch(() => {
        setError("Failed to fetch orders");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getAllOrders]);

  function sendId(id){
    getUserOrders(id)
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-emerald-600 mb-5">All Orders</h2>

      {loading ? (
        <div className="text-center text-emerald-600">
          <i className="fas fa-spinner fa-spin text-2xl"></i> Loading Orders...
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders?.map((order) => ( 
            <div key={order._id} className="border p-4 rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold text-gray-700">
                Order #{order._id}
              </h3>
              <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Status: <span className="text-emerald-600 font-semibold">{order.status}</span></p>
              <p className="text-sm text-gray-500">Total: <span className="text-lg font-bold text-red-600">${order.totalOrderPrice}</span></p>
              <button onClick={()=>sendId(order._id)}><Link to={`/OrderDetails/${order._id}`} className="text-emerald-600 font-bold text-sm">View Details</Link></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

