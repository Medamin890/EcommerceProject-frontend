import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";

const ShareSection = ({ productName, productUrl }) => {
  const encodedURL = encodeURIComponent(productUrl);
  const encodedTitle = encodeURIComponent(`Check out this product: ${productName}`);

  return (
    <div className="flex items-center gap-4 mt-4">
      <span className="font-semibold">Share:</span>

      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`} target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-blue-600 hover:scale-110 transition-transform" size={20} />
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-sky-500 hover:scale-110 transition-transform" size={20} />
      </a>
      <a href={`https://www.linkedin.com/shareArticle?url=${encodedURL}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-blue-700 hover:scale-110 transition-transform" size={20} />
      </a>
      <a href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedURL}`} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="text-green-500 hover:scale-110 transition-transform" size={20} />
      </a>
      <a href={`https://t.me/share/url?url=${encodedURL}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
        <FaTelegram className="text-sky-600 hover:scale-110 transition-transform" size={20} />
      </a>
      <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-pink-500 hover:scale-110 transition-transform" size={20} />
      </a>
    </div>
  );
};

export default ShareSection;
