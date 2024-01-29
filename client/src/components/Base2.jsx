import React from "react";
import { TiTick } from "react-icons/ti";
const Base2 = () => {
  return (
    <div className="mt-20 px-1 md:px-5">
      <h1 className="text-2xl font-bold mb-4">
        Why EasePG or Why you should choose us?
      </h1>
      <ul class="space-y-4 text-left text-black ">
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <svg
            class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg> */}
          <TiTick className="text-white w-10 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <p className="text-lg md:text-xl  ">
            {" "}
            Complete elimination of book keeping records
          </p>
        </li>
        <li class="flex items-center space-x-3 md:rtl:space-x-reverse">
          <TiTick className="text-white w-10 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <p className="text-lg md:text-xl  ">
            Easy addition and removal of tenants' data
          </p>
        </li>
        <li class="flex items-center space-x-3 md:rtl:space-x-reverse">
          <TiTick className="text-white w-32 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <p className="h-auto text-lg md:text-xl  ">
            We use technologies like security socket layer (SSL), which prevents
            data leakages and provides 100% security to yours and your tenants'
            data
          </p>
        </li>
        <li class="flex items-center space-x-3 md:rtl:space-x-reverse">
          <TiTick className="text-white w-24 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <p className="text-lg md:text-xl  ">
            Get rid of remembering the numbers of rent amount in accordance with
            rent paid and not paid by the tenants
          </p>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <TiTick className="text-white w-16 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <p className=" text-lg md:text-xl ">
            Complete automated algorithms for maintaining tenants' details
          </p>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <TiTick className="text-white w-16 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <p className="md:text-xl text-lg ">
            Monthly and previous monthly access to tenants' data history
          </p>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <TiTick className="text-white w-16 h-7 md:w-5 md:h-5 bg-green-500 rounded-full" />
          <span className="md:text-xl text-lg ">
            In short, one stop destination for your hassle free rent management
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Base2;
