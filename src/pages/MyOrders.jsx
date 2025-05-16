import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from './context/ShopContext';
import axios from 'axios';
import { FaBox, FaCheck, FaTruck } from 'react-icons/fa'; // Assuming this icon is needed
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import EmptyOrders from '../components/Order/EmptyOrder'; // Assuming this is the correct path to your EmptyOrders component

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(ShopContext);

  // Function to fetch user orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch orders when token changes
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token,data]);

  if (!data || data.length === 0) {
    return (
      <EmptyOrders />
    );
  }
  return (
    <section className=" p-8 md:pt-44 pt-24 xs:px-12 px-2">  
        <h4 className="bold-24">My Orders</h4>
        <table className="w-full my-8 table-auto">
          <thead> 
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-centre hidden sm:table-cell">Package</th>
              <th className="p-1 text-centre">Title</th>
              <th className="p-1 text-centre">Price</th>
              <th className="p-1 text-centre">Quantity</th>
              <th className="p-1 text-centre">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left"
              >
                <td className="hidden sm:table-cell justify-items-center">
                  <FaBox className="text-2xl  text-yellow-600" />
                </td>
                <td className="p-2 max-w-md  justify-items-start text-left">
                  <div className="p-2">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return `${item.name} x ${item.quantity}`;
                      } else {
                        return `${item.name} x ${item.quantity}, `;
                      }
                    })}
                  </div>
                </td>
                <td className="p-2   justify-items-center text-center ">${order.amount}</td>
                <td className="p-2   justify-items-center text-center">{order.items.length}</td>
                <td className="p-2 w-48 text-center">
                      <div className="flex p-2 justify-center text-center">
                        <div 
                          className={`flexBetween gap-x-1 items-center ${
                            order.status === "Out for Delivery" ? "text-blue-400" :
                            order.status === "Delivered" ? "text-green-500" :
                            order.status === "Product Loading" ? "text-orange-500" : "text-gray-500"
                          }`}
                        >
                          <span className="mr-2">&#x25cf;</span>
                          <div >
                            {order.status === "Out for Delivery" && ( 
                              <FaTruck className="text-blue-400" />)
                            }
                            {order.status === "Delivered" && ( 
                              <FaCheck className="text-green-500" />
                            )}
                            {order.status === "Product Loading" && ( 
                              <Spin indicator={<LoadingOutlined className='text-orange-500' spin/>} size="default" />
                            )}
                          </div>
                          <b>{order.status}</b>
                        </div>
                      </div>
                   </td>
              </tr>
            ))}
          </tbody>
        </table>
    </section>
  );
};

export default MyOrders;
