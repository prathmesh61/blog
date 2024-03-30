import React from "react";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="bg-gray-800 rounded-md p-4 md:min-w-[900px] min-w-[350px] flex flex-col gap-y-3">
      <div className="flex items-center bg-gray-600 w-[200px]  h-[30px]  justify-between">
        <span className="bg-gray-300 w-fit h-auto"></span>
        <span className="text-sm bg-gray-300 w-fit h-auto"></span>
      </div>
      <h1 className="text-xl font-bold bg-gray-300 w-fit h-auto"></h1>
      <p className="text-base font-medium bg-gray-600 w-[300px] md:w-[700px] h-[30px]"></p>
      <button className="bg-purple-500 text-white px-6 py-2 rounded-lg text-sm w-fit"></button>
    </div>
  );
};

export default Spinner;
