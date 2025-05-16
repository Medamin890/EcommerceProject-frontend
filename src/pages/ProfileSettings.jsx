import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "./context/ShopContext";
import { Button, Popconfirm } from "antd";
import { FaEnvelope, FaLocationDot, FaPhone, FaUser } from "react-icons/fa6";
import { FaBirthdayCake, FaTrashAlt } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Modal, Input } from "antd";
import ForgetPasswordModal from "../components/ProfileSettings/ForgetPassword";
import { RiKeyFill } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";

const ProfileSettings = (setShowLogin) => {
  const {token,setToken,url} =useContext(ShopContext);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    prename: "",
    address: "",
    sexe: "",
    phone: "",
    birthday: "",
    email: "",
    profileImage: null,
  });
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const [isForgetPasswordModalOpen, setIsForgetPasswordModalOpen] = useState(false);
  

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(url+"/api/user/getuser", {
        headers: { token },
      });
      const user = data?.user || {};
      setUserData({
        userId: user?._id || "",
        name: user?.name || "",
        prename: user?.prename || "",
        address: user?.address || "",
        sexe: user?.sexe || "",
        phone: user?.phone || "",
        birthday: user?.birthday || "",
        email: user?.email || "",
        profileImage: user?.profileImage || "",
      }); 
      console.log("User data fetched:", userData);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };
  useEffect(() => { 
    fetchUserData();
  }, [token]);
  
    // LOGOUT function
  const logout =()=>{
    localStorage.removeItem("token");
    setToken("");
    setShowLogin(true)
    navigate("/");
    window.location.reload(); // forces full reload

  }
  

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


// Update User Function
//!!!!!!!!!!!!!!! let's do this function to update the user information
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    console.log("userData", userData);
    const formData = new FormData();
    formData.append("userId", userData?.userId);
    formData.append("name", userData?.name);
    formData.append("prename", userData?.prename);
    formData.append("email", userData?.email);
    formData.append("phone", userData?.phone);
    formData.append("address", userData?.address);
    formData.append("sexe", userData?.sexe);
    formData.append("birthday", userData?.birthday);
    // append the profileImage to the formData
    const image = userData.profileImage;
    if (image) {
        if (image instanceof File) {
        // If it's a File, append directly
        formData.append(`profileImage`, image);
        }else if (typeof image === 'string') {
            // If it's a URL, fetch and convert to File
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], "profileImage", { type: blob.type });
            formData.append("profileImage", file);
        }
    }
  
      // Log all entries in formData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
     await axios.put(
      url + "/api/user/update",
       formData 
    );
    // Update the userData state with the new data
    toast.success('Update successful');
    fetchUserData();
  } catch (err) {
    toast.error("Update failed");
    console.error("Error updating profile:", err);
  }
};

  const handleDelete = async () => {
    try {
      const { data } = await axios.post(
        url+"/api/user/delete",
        { headers : { token} },
      );
      toast.success("Account deleted successfully");
      logout();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        profileImage: file
      }));
    }
  };
  
  const handleRemoveImage = () => {
    setUserData((prev) => ({
      ...prev,
      profileImage: null
    }));
  };
  

  const editPassword = async () => {
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
  
    try {
      const { data } = await axios.post(
        url + "/api/user/editpassword",
        { oldPassword, newPassword, confirmPassword },
        { headers: { token } }
      );
      toast.success(data.message);
      setIsEditPasswordModalOpen(false);
      setoldPassword(""); 
      setnewPassword(""); 
      setconfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Edit failed");
    }
  };
  

  return (
          <div className="pt-36 max-w-4xl  mx-auto lg:px-4 px-12 pb-12">
          <h1 className="text-3xl font-bold -mt-2 ">Profile Settings</h1>
        
          {/* Update Info */}
          <form  onSubmit={handleUpdate}>
            {/* profileImage */}
            <div className="flex justify-center -m-3">
              <div className="relative w-32 h-32">
                <label
                  htmlFor="upload-input"
                  className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-gray-200 transition duration-300 overflow-hidden"
                >
                  {!userData.profileImage ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 01.88-2.5M3 15a4 4 0 004 4h10m5-5a4 4 0 00-.88-2.5M21 15a4 4 0 01-4 4H7m10-10V3m0 0l-3 3m3-3l3 3"
                        />
                      </svg>
                      <span className="mt-2 text-sm text-gray-600">Upload</span>
                    </>
                  ) : (
                    <img
                      src={
                        userData.profileImage instanceof File
                        ? URL.createObjectURL(userData.profileImage)
                        : userData.profileImage
                      }
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                  <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Remove Button */}
                {userData.profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                )}
              </div>
            </div>

            {/* sexe  */}
            <div className="flexCenter w-full p-4 ">
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sexe"
                          value="male"
                          checked={userData.sexe === "male"}
                          onChange={handleChange}
                          className="accent-blue-500 cursor-pointer"
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sexe"
                          value="female"
                          checked={userData.sexe === "female"}
                          onChange={handleChange}
                          className="accent-pink-500 cursor-pointer"
                        />
                        Female
                      </label>
                    </div>
            </div>
            {/* name, prenom, email, phone, address, birthday */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 !gap-x-4 minx-w-60">
              <div className="flex gap-x-4 col-span-2">
              {/* name  */}
              <div className="relative block min-w-28 w-full">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input name="name" placeholder="First Name" value={userData?.name || ""} onChange={handleChange} className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              {/* prenom  */}
              <div className="relative block min-w-28 w-full">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input name="prename" placeholder="Last Name" value={userData?.prename || ""} onChange={handleChange} className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              </div>
              {/* email  */}
              <div className="relative col-span-2">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input name="email" placeholder="Email" value={userData?.email || ""} onChange={handleChange} className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex gap-x-4 col-span-2">
              {/* phone  */}
              <div className="relative block min-w-28 w-full">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input name="phone" placeholder="Phone" value={userData?.phone || ""} onChange={handleChange} className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              {/* address */}
              <div className="relative block min-w-28 w-full">
                <FaLocationDot className="absolute left-3 top-3 text-gray-400" />
                <input name="address" placeholder="Address" value={userData?.address || ""} onChange={handleChange} className="border-2 w-full border-gray-300 p-2 pl-10 rounded-xl focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              {/* birthday  */}
              <div className="relative  col-span-2">
               <FaBirthdayCake className="absolute left-3 top-3 text-gray-400" />
               <label className="absolute left-10 top-3 text-gray-400" >brithday</label>
                <input type="date" name="birthday"   value={userData.birthday ? userData.birthday.slice(0, 10) : ""} onChange={handleChange} className=" flex border-2 w-full  border-gray-300 p-2  place-content-end rounded-xl focus:outline-none focus:border-blue-500" >
                </input>
              </div>
              {/* edit password  */}
              <div className="flex col-span-2">
                      <div className="relative w-full">
                        <MdVpnKey    className="absolute left-3 top-2 text-gray-400 text-lg   " />
                        <label className="absolute left-10 top-3 text-gray-400 " >***********</label>
                        <input name="password"   disabled className=" flex border-2  w-full border-gray-300 p-2 pl-32  place-content-end rounded-s-xl focus:outline-none focus:border-blue-500"/>
                      </div>
                        <button type="button" title="Edit Password" onClick={()=>setIsEditPasswordModalOpen(true)} className="animation-btns bg-blue-500 flex gap-x-2 min-w-max text-white px-4 py-2 rounded-e-xl hover: rounded-s-sm hover:bg-blue-600">
                          <BiEditAlt />
                          <span className="hidden xs:block">Edit Password</span>
                        </button>
              </div>
            </div>
            {/* forget password */}
            <div className="flex justify-end mb-2 mt-1 ">
              <Button type="link" className="text-blue-500 underline hover:text-blue-700 animation-btn" onClick={() => setIsForgetPasswordModalOpen(true)} >
                <FaEnvelope className="inline-block mr-1 " />
                Forgot Password?
              </Button>
            </div>
             {/* Update Profile */}
          <div className=" relative col-span-2 ">
            <button type="submit" className="w-full animation-btns bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-xl">
              Update Profile
            </button>
          </div>
          </form>
          {/* Delete Acoun */}
          <div className="mt-8 px-2">
              <hr className="border-t-1 border-black mt-14" />
              <div className="px-2">
              <h2 className="text-xl font-bold my-4">Delete Account</h2>
              <span className=" text-sm  text-gray-500 ">
                Deleting your account will remove all your data and cannot be undone.
                Are you sure you want to delete your account? This action cannot be undone.
                <br />
                <span className="text-red-500 font-semibold  ">All your data will be lost.</span>
              </span>
              </div>
              <br />
                {/* delete acount btn  */}
              <Popconfirm
                title="Are you sure to delete this account?"
                onConfirm={handleDelete}
                onCancel={() => toast.info("Delete cancelled")}
                okText="Yes"
                cancelText="No"
                placement="top"
                className="w-full "
                icon={<IoWarning    className="text-red-700 text-xl  mr-1"/>}
                okButtonProps={{ className: "bg-red-600 hover:!bg-red-400" }}

              >
                <button className="w-full bg-red-600 flexCenter px-2 gap-x-2 hover:bg-red-700 animation-btns mt-2 text-white py-2 rounded-xl">
                  <FaTrashAlt className="inline-block ml-2" />
                  Delete Account
                </button>   
              </Popconfirm>
          </div>
          {/* edit password modal  */}
          <Modal
            title="Edit Password"
            open={isEditPasswordModalOpen}
            onCancel={() => setIsEditPasswordModalOpen(false)}
            onOk={editPassword}
            okText="Save"
          >
            <div className="flex flex-col items-center">
            <span  className="text-gray-500 text-sm font-sans mb-2">
              To change your password, please enter your old password and the new password you want to set.
            </span>
            <Input.Password
              prefix={<RiKeyFill   className=" text-gray-500  mr-1" />}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
              className="mb-2"
            />
            <Input.Password
              prefix={<RiKeyFill   className=" text-gray-500  mr-1" />}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="mb-2"
            />
            <Input.Password
              prefix={<RiKeyFill   className=" text-gray-500  mr-1" />}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            </div>
          </Modal>
          {/* forget password modal           */}
          <ForgetPasswordModal
            isForgetPasswordModalOpen={isForgetPasswordModalOpen}
            setIsForgetPasswordModalOpen={setIsForgetPasswordModalOpen}
            userData={userData}
          />
   </div>
  );
};

export default ProfileSettings;
