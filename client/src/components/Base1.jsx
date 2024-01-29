import body2image from "../assets/download.jpeg";
const Base1 = () => {
  return (
    <div className="w-full flex justify-between  items-center px-1  md:px-5">
      <div className="w-[600px]  h-auto ">
        <h2 className="font-bold text-lg md:text-xl">
          To all the PG owners out there, while you run your PG,
        </h2>
        <h2 className="font-bold text-lg md:text-xl">
          There are some questions to be asked for:
        </h2>
        <p className="text-lg md:text-xl font-medium mt-5 pb-2  ml-5">
          Are you frustrated with managing rents?
        </p>
        <p className="text-lg md:text-xl font-medium pb-2 ml-5">
          Are you fed up calculating various amounts?
        </p>
        <p className="text-lg md:text-xl font-medium pb-2 ml-5">
          Should hard copy documents for the authentication of a tenant become
          obsolete?
        </p>
        <p className="text-lg md:text-xl font-medium pb-2 ml-5">
          Do you need all the tenants details at one place?
        </p>
        <p className="text-lg md:text-xl font-medium pb-2 ml-5 mb-5">
          Are you in search of hassle free rent management?
        </p>

        <h2 className="font-bold text-lg md:text-xl ml-0 md:ml-10">
          What is the answer to these questions?
        </h2>
        <h1 className="font-bold text-lg md:text-xl ml-0 md:ml-5">
          <span className="font-bold text-blue-500">"EasePG"</span> is one word
          answer to all your questions above
        </h1>
      </div>
      <div className="w-[500px]  h-[340px] hidden lg:block round-lg">
        {/* <img src={body1image} alt="body" /> */}
        <img
          src={body2image}
          alt="body"
          className="w-full h-full object-fit pr-10"
        />
      </div>
    </div>
  );
};

export default Base1;
