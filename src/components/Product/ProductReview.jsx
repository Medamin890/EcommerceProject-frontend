import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import axios, { all } from "axios";
import { Rate, Button, Input, message } from "antd";
import { ShopContext } from "../../pages/context/ShopContext";
import { FaCircleUser, FaTrash, FaTrashArrowUp } from "react-icons/fa6";
import {  BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { LiaEdit, LiaTrashSolid } from "react-icons/lia";


const ProductReview = ({ productId }) => {
  const { token,url } = useContext(ShopContext);
  const [userId, setUserId] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [userData, setUserData] = useState({});
  const [isOpenUpdatereview, setIsOpenUpdatereview] = useState(false);
  const OpenUpdate = () => {
    setIsOpenUpdatereview(true);
  }
  const CloseUpdate  = () => {
    setIsOpenUpdatereview(false);
  }

  // fetch the reviews and myReview 
  const fetchReviews = async () => {
    try {
      const res = await axios.get(url + "/api/reviews/list");
      console.log("res.data", res.data);

      const productReviews = res?.data?.filter(r => r?.id_product === productId) || [];
      setAllReviews(productReviews);
      console.log("setAllReviews", productReviews);

      if (userId) {
        const existing = productReviews.find(r => r.idUser === userId);
        console.log("existing", existing);
          setMyReview(existing || null);
          setRate(existing.rate || 0);
          setComment(existing.comment || "");
          setDate(existing.date || "");
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };
  // 🔁 Trigger on first load or when hanges
  useEffect(() => {
      fetchReviews();
  }, [token]); 

  const handleAdd= async () => {
    try {

        await axios.post(
          url+"/api/reviews/add",
          { id_product: productId, rate, comment },
          { headers: { token } }
        );
        message.success("Review added.");
      fetchReviews();
    } catch (err) {
      message.error("try again.");
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(url+"/api/reviews/remove", {
        data: { id }, // Must wrap in `data`
      });
      message.success("Review deleted.");
      setRate(0);
      setComment("");
      fetchReviews();
      fetchuserData();
    } catch (err) {
      message.error("try again.");
      console.error(err);
    }
  };
  const handleupdate = async (id,rate,comment) => {
    try {
     await  axios.put(
        url+"/api/reviews/update",
        {  id,rate, comment },
      );
      message.success("Review updated.");
      fetchReviews();
      fetchuserData();
      CloseUpdate();
    } catch (err) {
      message.error("try again.");
      console.error(err);
    }
  }
  
 const fetchuserData = async () => {
    try {
      const res = await axios.get(url+"/api/user/getuser", {
        headers: { token },
      });
      console.log("res.data", res.data);
      setUserData(res.data?.user);
      setUserId(res.data?.user._id);
    } catch (err) {
      message.error("Failed to load user data.");
    }
  }
  useEffect(() => {
      fetchuserData();
  }, [token]);




  //functoin to get the data of the poeple coment in the product execpt the myreview
  const [userInfos, setUserInfos] = useState({}); // { userId: userData }
  const getUserinfo = async (userId) => {
    try {
      const res = await axios.get(url+"/api/user/getuserById", {
        params: { id: userId },
      });
      return res.data.user;
    } catch (err) {
      console.error("Failed to load user data.", err);
    }
  }
  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = {};
      for (const review of allReviews) {
        if (!users[review.idUser]) {
          const user = await getUserinfo(review.idUser);
          if (user) users[review.idUser] = user;
        }
      }
      setUserInfos(users);
    };
  
    if (allReviews.length) fetchAllUsers();
  }, [allReviews]);
  


  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold">Rating and Reviews</h3>
      {/* add review if he dosen't have any old message because for  each product he must have not > 1 review*/}
        {!myReview ? (
          <div className="flex-col bg-gray-100 p-4 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">

                      {userData.profileImage ? (
                        <img
                          src={userData.profileImage}
                          alt="Profile"
                          className="w-12 h-12 rounded-full  "
                        />
                      ) : (
                      <FaCircleUser className="text-3xl " />
                      )}
              <span className="text-sm text-gray-500 mr-2">{userData.prename} {userData.name}</span>
              
            </div>
            <div>
              <Rate value={rate} onChange={setRate} />
              <Input.TextArea
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                
                placeholder="Write your review..."
                className="mt-2"
                />
              <Button type="primary" className="mt-3" onClick={handleAdd}>
                Submit Review
              </Button>
            </div>
          </div>
        ): (
      /* display my review if he has any */
          <div
            className="flex flex-col w-full p-4 gap-y-2 mb-2 bg-gray-100/50  rounded shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <FaCircleUser className="w-10 h-10 ml-1" />
              )}
              <span className="text-sm text-gray-500">
                {userData?.prename} {userData?.name}
              </span>
              {/* edit and delete coment btns */}
              <div className="relative ml-auto group">
                <button  className="rounded-full p-2 hover:bg-gray-200 animation-btns">
                  <BsThreeDotsVertical />
                </button>
                <ul className="absolute cursor-pointer  right-0 flex-col hidden w-36 p-2 z-50 rounded-xl shadow-sm bg-white ring-1 ring-slate-900/15 group-hover:flex group-hover:animate-fadeIn  group-hover:duration-200">
                      <li
                        onClick={OpenUpdate}
                        className="flexStart gap-x-2  px-2 w-full py-2 text-xs text-blue-600 hover:bg-gray-200 hover:text-blue-400 hover:rounded-md"
                        >
                          <FaEdit className=" text-lg !h-4 w-4" />
                          Edit Review 
                        
                      </li>
                      <li
                        onClick={()=>handleDelete(myReview?._id)}
                        className="flexStart gap-x-2 w-full px-1 py-2 text-xs text-red-600 hover:bg-gray-200 hover:text-red-400 hover:rounded-md"
                        >
                          <LiaTrashSolid className="text-lg h-5 w-5" />
                          Delete Review 
                        
                      </li>
                </ul>

              </div>
            </div>

            <div className="w-full gap-x-2 flex items-center">
              <Rate className="text-sm" value={rate}  onChange={setRate} disabled={!isOpenUpdatereview}/>
              <span className="text-xs text-blue-500">
                {/* {new Date(date).toISOString().split("T")[0]} */}
              </span>
            </div>
            {
              isOpenUpdatereview ? (
                <div className="w-full">
                  <Input.TextArea
                    rows={3}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="mt-2  !w-full"
                  />
                  <div className="flexBetween flex-row gap-x-2 py-4">
                      {/* btn cancel update */}
                      <Button type="default" icon={<LiaTrashSolid className="text-lg"/>} danger className="mt-3 ml-2" onClick={CloseUpdate}>
                        Cancel
                      </Button>
                      <Button type="primary" icon={<LiaEdit className="text-lg"/>}  className="mt-3" onClick={()=>handleupdate(myReview._id,rate,comment)}>
                        Update Review
                      </Button>
                    </div>
                </ div>
            ):(

              <span className="text-gray-500 mb-2 font-medium font-sans">
              {myReview?.comment}
            </span>
            )}
          </div>
        )}
      {/* display reviews */} 
      <div className="flex flex-col w-full">
        {allReviews
          .filter((review) => review.idUser !== userId) // 👈 filter out user's own review
          .map((review) => {
            const user = userInfos[review.idUser];

            return (
              <div
                key={review._id}
                className="flex flex-col w-full p-4 gap-y-2 mb-2 bg-white rounded shadow"
              >
                <div className="flex w-full gap-x-2 items-center mb-1">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <FaCircleUser className="w-10 h-10 ml-1" />
                  )}
                  <span className="text-sm text-gray-500">
                    {user?.prename} {user?.name}
                  </span>
                </div>
                <div className="w-full gap-x-2 flex items-center">
                  <Rate className="text-sm" value={review.rate} disabled />
                  <span className="text-xs text-blue-500">
                    {new Date(review?.date).toISOString().split("T")[0]}
                  </span>
                </div>
                <span className="text-gray-500 mb-2 font-medium font-sans">
                  {review.comment}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductReview;
