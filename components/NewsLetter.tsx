import React from "react";

type Props = {};

const NewsLetter = (props: Props) => {
  return (
    <div className="mt-10 w-full h-[300px] flex flex-col items-center ">
      <div className="flex flex-col gap-y-2 py-2 px-4">
        <h1 className="font-extrabold md:text-4xl text-2xl">
          Learn NextJS From The Ground Up 🚀
        </h1>
        <p className="md:w-[600px] w-[350px] text-sm md:text-lg text-gray-400">
          Want to use NextJS to it's full potential and understand how it really
          works? Check out my free NextJS course:
        </p>
      </div>
      <div className="flex flex-col gap-y-2 py-2 px-4 ">
        <label className="font-medium text-base text-white">
          Your email address
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            className="px-4 py-2 md:w-[550px] w-[350px] border-gray-600 rounded-lg"
            placeholder="Email"
          />
          <button className="bg-green-600 text-white rounded-lg px-4 py-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
