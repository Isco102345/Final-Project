import React, { useContext, useState, useEffect } from 'react';
import style from './OrderDetails.module.css';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getUserOrders } = useContext(CartContext);


  useEffect(() => {
    setLoading(true);
    setError(null);

    getUserOrders(id)
      .then((data) => {
        if (data?.order) {
          setOrder(data.order);
        } else {
          setError("No order found for this ID.");
        }
      })
      .catch((err) => {
        setError("Failed to fetch order");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, getUserOrders]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-emerald-600 mb-5">Order Details</h2>

      {loading ? (
        <div className="text-center text-emerald-600">
          <i className="fas fa-spinner fa-spin text-2xl"></i> Loading Order...
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        order ? (
          <div>
            <h3>Order Details for #{order._id}</h3>
            {order.products?.map((product) => (
              <div key={product._id}>
                <h4>{product.subcategory?.title}</h4>
                <img src={product.imageCover} alt={product.title} />
                <p>{product.description}</p>
                <p>{product.totalOrderPrice}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No order found for this ID.</p>
        )
      )}
    </div>
  );
}
