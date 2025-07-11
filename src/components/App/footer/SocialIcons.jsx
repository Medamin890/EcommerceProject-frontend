import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiDribbbleFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterFill,
  RiYoutubeFill,
} from 'react-icons/ri';

const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4">
      <Link to="#" className="text-[#88d9d6] text-2xl hover:-translate-y-1 transition-all duration-300">
        <RiYoutubeFill />
      </Link>
      <Link to="#" className="text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration-300">
        <RiInstagramFill />
      </Link>
      <Link to="#" className="text-[#ff2e63] text-2xl hover:-translate-y-1 transition-all duration-300">
        <RiTwitterFill />
      </Link>
      <Link to="#" className="text-[#eaeaea] text-2xl hover:-translate-y-1 transition-all duration-300">
        <RiLinkedinFill />
      </Link>
      <Link to="#" className="text-[#f9ed69] text-2xl hover:-translate-y-1 transition-all duration-300">
        <RiDribbbleFill />
      </Link>
      <Link to="#" className="text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-300">
        <RiGithubFill />
      </Link>
    </div>
  );
};

export default SocialIcons;