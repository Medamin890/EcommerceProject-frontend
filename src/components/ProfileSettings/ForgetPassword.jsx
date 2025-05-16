import { Modal,Input, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../../pages/context/ShopContext";
import { MdEmail, MdOutlineMailLock, MdOutlinePassword } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import Link from "antd/es/typography/Link";

const ForgetPasswordModal = ({ isForgetPasswordModalOpen, setIsForgetPasswordModalOpen, userData }) => {
  const [resetCode, setResetCode] = useState("");
  const [numberResetCode, setnumberResetCode] = useState(0);
  const {url} = useContext(ShopContext);
  const [generatedCode, setGeneratedCode] = useState("");
  const [resetCodeIsCorrect, setResetCodeIsCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendResetCodeEmail = async () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    const emailData = {
      to: userData?.email,
      subject: "Password Reset Code",
      text: `
                Hello, ${userData?.email}
                We're sending a security code to confirm it's really you. Here's the code to enter in TechStore:
                Code: ${code}

                Don't share this code with anyone.

                If someone asks for this code, especially claiming to be from TechStore, do not share it.

                Didn't request this?
                It's possible someone is trying to hack your account. If you don't share this code, no action is required.

                Thanks,
                TechStore Security Team
                    `,
     };
    try {
        const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
            service_id: "service_xvhyrca",
            template_id: "template_gr7sja4",
            user_id: "hEd9iR6E-gze74O4f",
            template_params: {
              name: "techStoreContact",
              time: new Date().toLocaleString(),  // Human-readable time string
              email: emailData.to,
              subject: emailData.subject,
              message: emailData.text,
            }
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(
            emailData
          );
      if (response.status === 200) {
        toast.success("Code sent! Check your email.");
        setnumberResetCode(numberResetCode + 1);
      } else {
        toast.error("Failed to send code. Try again.");
      }
    } catch (error) {
      toast.error("Email error: " + error.message);
    }
  };

  const chekingCodehundler = () => {
    if (resetCode === generatedCode) {
      toast.success("Code verified!");
      setResetCodeIsCorrect(true);
    } else {
      toast.error("Incorrect code");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("Please enter both passwords");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try{
        // Here you can call your backend to update the password if needed
        await axios.post( url+'/api/user/forgetPassword',
                        { email: userData?.email, newPassword: newPassword}
        );
        toast.success("Password reset successfully!");
        setIsForgetPasswordModalOpen(false);
      }
  catch (error) {
        toast.error("Failed to reset password. Try again.");
        console.error("Error resetting password:", error);}  
  };

  return (
    <Modal
      title="Reset Password With Email"
      open={isForgetPasswordModalOpen}
      onCancel={() => setIsForgetPasswordModalOpen(false)}
      footer={null}
    >
      <div className="text-gray-500 mb-2">
        <span className="flex items-center text-gray-90 gap-2 my-1" > 
          <MdOutlineMailLock className="text-gray-90 text-lg mr-1" />
          {userData.email}
        </span>
        <span >
         to send the verification code  to your email address.Press send Code.and check your email.
         <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-blue-500 underline pl-2 "
          >
            Check your mailbox
          </a>
         </span>
      </div>
        <Button type="primary" icon={<RiMailSendLine />} onClick={sendResetCodeEmail} className="mb-2">
            {numberResetCode > 0 ? "try again":'Send Code'}
          </Button>


      {!resetCodeIsCorrect ? (
        <>
          <Input
            prefix={<MdOutlinePassword  className=" text-gray-500 mr-1" />}
            placeholder="6-digit verification code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="my-2"
          />
          <div className="flexEnd">
          <Button  type="primary" disabled={!resetCode} onClick={chekingCodehundler}>
            Next
          </Button>
          </div>
        </>
      ) : (
        <>
          <p>
            Enter the new password for <b>{userData?.email}</b>
          </p>
          <Input.Password
            prefix={<RiKeyFill   className=" text-gray-500  mr-1" />}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-2"
          />
          <Input.Password
            prefix={<RiKeyFill   className=" text-gray-500  mr-1" />}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-2"
          />
          <Button type="primary" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      )}
    </Modal>
  );
};

export default ForgetPasswordModal;
