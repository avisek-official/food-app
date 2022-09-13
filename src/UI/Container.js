import React from "react";

const Container = (props) => {
  return (
    <div className="m-0 p-0 bg-gradient-to-r from-green-400 to-green-300 w-full min-h-screen h-auto">
      {props.children}
    </div>
  );
};

export default Container;
