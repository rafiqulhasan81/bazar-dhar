
// "use client";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function ToastProvider() {
//   return (
//     <ToastContainer
//       position="top-right"
//       autoClose={3500}
//       newestOnTop
//       closeOnClick
//       pauseOnHover
//       theme="colored"
//     />
//   );
// }

// "use client";

// import { ToastContainer } from "react-toastify";

// export default function ToastProvider() {
// return ( <ToastContainer
//    position="top-right"
//    autoClose={3500}
//    newestOnTop
//    closeOnClick
//    pauseOnHover
//    theme="colored"
//  />
// );
// }



"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      containerId="global-toast"
      position="top-right"
      autoClose={2500}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  );
}


