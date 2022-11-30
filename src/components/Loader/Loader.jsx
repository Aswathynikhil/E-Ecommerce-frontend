import React from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio, Circles, Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div class="flex h-screen">
        <div class="m-auto">
          <Circles
            height="100"
            width="100"
            color="orange"
            ariaLabel="Loading"
          />
        </div>
      </div>
    </>
  );
};

export default Loader;

// import React from 'react';
// import Footer from '../Footer';

// const Loader = () => {
//   return (
//     <>
//             <div className=" p-2 pt-16 mb-16  mobile:flex-col mobile:items-start grid grid-cols-1 min-h-[320px] ">

//      <button type="button" class="bg-indigo-500 " disabled>
//   <svg class="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24">
//     {/* <!-- ... --> */}
//   </svg>
//   Processing...
// </button>
// </div>
// {/* <Footer /> */}

//     </>
//   );
// }

// export default Loader;
