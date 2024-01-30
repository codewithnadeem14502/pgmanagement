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
