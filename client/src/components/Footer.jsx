import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer class="bg-slate-800   my-14 ">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <div>
          <h1 className="mt-1 text-lg font-bold text-white ">Contact us :</h1>
          <div className="flex gap-2 mt-2">
            <FaPhoneVolume className="text-green-700 mt-2" />
            <h2 className="mt-1 text-sm  font-medium text-white">
              {" "}
              +91-9398300727, +91-6304439802
            </h2>
          </div>
          <div className="flex gap-2">
            <IoMdMail className="text-yellow-600 mt-2  w-5 h-5 " />
            <h2 className="mt-1 text-sm  font-medium text-white">
              {" "}
              pgmanagement911@gmail.com
            </h2>
          </div>
          <div className="flex gap-2 mb-5">
            <FaLocationDot className="text-red-700   mt-2  w-5 h-5" />
            <h2 className="mt-2 text-sm  font-medium text-white">
              {" "}
              Hyderabad{" "}
            </h2>
          </div>
        </div>
        <span class="text-sm md:mt-0 text-white sm:text-center ">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            pgmanagement™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
