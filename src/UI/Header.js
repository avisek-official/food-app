import React from "react";

const Header = (props) => {
  const cartClickHandler = () => {
    props.onViewCart();
  };
  return (
    <div className="flex justify-center sticky top-0 z-10">
      <div className="m-0 py-2 px-4 bg-gradient-to-r from-green-800 to-green-500 w-full h-auto flex justify-between items-center md:w-[768px]">
        <div className="logo">
          <img
            src={require("./images/logo.png")}
            alt="logo"
            height="80px"
            width="80px"
          />
        </div>
        <div
          className="h-auto w-auto p-4 rounded-lg bg-green-900 text-white text-lg font-bold cursor-pointer"
          onClick={cartClickHandler}
        >
          Your Cart ( {props.cartItems.length} )
        </div>
      </div>
    </div>
  );
};

export default Header;
