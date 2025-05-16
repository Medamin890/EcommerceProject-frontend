import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { BsSignpostSplit } from "react-icons/bs";
import { BsFlagFill } from "react-icons/bs";
import { ShopContext } from "./context/ShopContext";

const statesAndCities = {
  "Ariana": ["Ariana", "Ettadhamen", "Kalâat el-Andalous", "La Soukra", "Mnihla", "Raoued", "Sidi Thabet"],
  "Béja": ["Amdoun", "Béja", "Goubellat", "Medjez el-Bab", "Nefza", "Téboursouk", "Testour", "Thibar"],
  "Ben Arous": ["Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra", "Fouchana", "Hammam Chott", "Hammam Lif", "Mohamedia", "Medina Jedida", "Mégrine", "Mornag", "Radès"],
  "Bizerte": ["Bizerte", "Sejnane", "Mateur", "Ras Jebel", "Ghar El Melh", "Tinja", "Menzel Bourguiba", "Menzel Jemil", "Joumine", "Utique", "El Alia"],
  "Gabès": ["Gabès", "Chenini Nahal", "Ghannouch", "Mareth", "Matmata", "Métouia", "Menzel Habib", "Nouvelle Matmata"],
  "Gafsa": ["Gafsa", "Métlaoui", "Redeyef", "Moularès", "El Guettar", "Mdhila", "Sened", "Belkhir"],
  "Jendouba": ["Jendouba", "Bou Salem", "Tabarka", "Fernana", "Aïn Draham", "Beni M'Tir", "Ghardimaou", "Oued Meliz"],
  "Kairouan": ["Kairouan", "Hajeb El Ayoun", "Sbikha", "Bou Hajla", "Oueslatia"],
  "Kasserine": ["Kasserine", "Sbeitla", "Fériana", "Thala", "Majel Bel Abbès", "Hassi El Ferid", "Jedelienne"],
  "Kébili": ["Kébili", "Douz", "Souk Lahad", "Faouar"],
  "Kef": ["Le Kef", "Tajerouine", "Dahmani", "Sakiet Sidi Youssef", "Jérissa", "Nebeur", "El Ksour"],
  "Mahdia": ["Mahdia", "Chebba", "Rejiche", "Bou Merdes", "Chorbane", "El Jem", "Hbira", "Melloulèche", "Ouled Chamekh", "Sidi Alouane"],
  "Manouba": ["Manouba", "Douar Hicher", "Oued Ellil", "Den Den", "Tebourba", "Borj El Amri", "El Batan", "Jedaida"],
  "Medenine": ["Medenine", "Ben Gardane", "Zarzis", "Houmt Souk", "Midoun", "Ajim", "Beni Khedache"],
  "Monastir": ["Monastir", "Jemmal", "Ksar Hellal", "Moknine", "Sahline", "Sayada", "Téboulba", "Bembla", "Bekalta", "Zéramdine"],
  "Nabeul": ["Nabeul", "Hammamet", "Dar Chaâbane", "Korba", "Kelibia", "Menzel Temime", "El Haouaria", "Soliman", "Menzel Bouzelfa", "Grombalia", "Bou Argoub"],
  "Sfax": ["Sfax", "Agareb", "Bir Ali Ben Khalifa", "El Amra", "El Hencha", "Ghraiba", "Jebeniana", "Kerkennah", "Mahares", "Menzel Chaker", "Sakiet Eddaier", "Sakiet Ezzit"],
  "Sidi Bouzid": ["Sidi Bouzid", "Meknassy", "Menzel Bouzaiane", "Regueb", "Jilma", "Mezzouna", "Bir El Hafey"],
  "Siliana": ["Siliana", "Bargou", "Bou Arada", "El Krib", "Gaâfour", "Kesra", "Makthar", "Rouhia", "Sidi Bou Rouis"],
  "Sousse": ["Sousse", "Akouda", "Bouficha", "Enfidha", "Hammam Sousse", "Hergla", "Kalâa Kebira", "Kalâa Seghira", "Kondar", "Msaken", "Sidi Bou Ali"],
  "Tataouine": ["Tataouine", "Bir Lahmar", "Dehiba", "Ghomrassen", "Remada", "Smâr"],
  "Tozeur": ["Tozeur", "Degache", "Hazoua", "Nefta", "Tameghza"],
  "Tunis": ["Tunis", "Bab El Bhar", "Bab Souika", "Carthage", "Cité El Khadra", "Djebel Jelloud", "El Kabaria", "El Menzah", "El Omrane", "El Omrane supérieur", "Ettahrir", "Ezzouhour", "Hraïria", "La Goulette", "La Marsa", "Le Bardo", "Le Kram", "Médina", "Séjoumi", "Sidi Hassine"],
  "Zaghouan": ["Zaghouan", "Bir Mcherga", "El Fahs", "Nadhour", "Saouaf"]
};


const Order = () => { 
  const { getTotalCartAmount, token, all_products, cartItems, url } = useContext(ShopContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "Tunisia",
    phone: "",
  });
  const cartAmount = getTotalCartAmount();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    for (let key in data) {
      if (!data[key].trim()) {
        toast.error(`${key} is required`, {
          position: "top-center",
          autoClose: 3000,
        });
        return false;
      }
    }
    return true;
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      console.log("Validation failed !!!"); 
      return;
    }

    let orderItems = [];
    all_products.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (cartAmount < 300 ? cartAmount+10 : cartAmount),
      paymentMethode: "card", // or any other payment method
    };
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
      console.log("response:", response);
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Order failed !", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing the order", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-20 p-8 mt-32 mb-16 rounded-xl px-24">
      <div className="flex-1 rounded-xl p-8 border ">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={placeOrder}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="relative col-span-2">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="relative col-span-2">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={data.phone}
              onChange={handleChange}
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="relative col-span-2">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={data.street}
              onChange={handleChange}
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="relative">
            <select
              name="state"
              value={data.state}
              onChange={handleChange}
              className="border-2  w-full border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            >
              <option value="">Select State</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              name="city"
              value={data.city}
              onChange={handleChange}
              className="border-2  w-full border-gray-300 p-2 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            >
              <option value="">Select City</option>
              {data.state &&
                statesAndCities[data.state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <div className="relative">
          <BsSignpostSplit className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              value={data.zipcode}
              onChange={handleChange}
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="relative">
          <BsFlagFill className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="country"
              placeholder="Tunisia"
              readOnly
              className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-orange-500 text-white p-2 rounded-xl hover:bg-blue-500 animation-btn hover:shadow-md col-span-2"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/3 rounded-xl p-8 border">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="border-b border-gray-300 py-2 flex justify-between">
          <span>Subtotal:</span>
          <span>{cartAmount}</span>
        </div>
        <div className="border-b border-gray-300 py-2 flex justify-between">
          <span>Shipping Fee:</span>
          <span>${cartAmount >= 300 ? 0 : 10}</span>
        </div>
        <div className="border-b border-gray-300 py-2 flex justify-between font-bold">
          <span>Total:</span>
          <span>${cartAmount >= 300 ? cartAmount : cartAmount + 10}</span>
        </div>
      </div>
    </section>
  );
};

export default Order;