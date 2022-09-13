import React, { useState } from "react";

const SingleItem = (props) => {
  const [descToggle, setDescToggle] = useState(false);

  let totAmnt = props.totAmnt;

  const addBtnClickHandler = () => {
    const itemAdded = {
      id: props.itemId,
      itemName: props.itemName,
      itemPrice: props.itemPrice,
      addedQuantity: 1,
    };
    props.itemAdded(itemAdded);
    props.newTotAmnt(totAmnt + props.itemPrice);
  };

  const chngQuanHandler = (chngItemDetails) => {
    props.chngItemQty(chngItemDetails);
    props.newTotAmnt(chngItemDetails.newTotAmnt);
  };

  const descToggleHandler = () => {
    setDescToggle(!descToggle);
  };

  return (
    <div className="flex justify-between flex-wrap w-[95%] md:w-[768px] h-auto bg-white rounded-md shadow-lg p-4 items-center my-2">
      <div className="flex flex-col w-[70%] md:w-[80%]">
        <div className="itemName font-bold text-xl">{props.itemName}</div>
        <div className="itemName italic text-md text-justify">
          <span className="sm:hidden" onClick={descToggleHandler}>
            <span
              className={`${descToggle && "hidden"} cursor-pointer`}
            >{`${props.itemDesc.slice(0, 60)}...`}</span>

            <span className={`${!descToggle && "hidden"} cursor-pointer`}>
              {props.itemDesc}
            </span>
          </span>
          <span className="hidden sm:block">{props.itemDesc}</span>
        </div>
        <div className="itemName font-bold text-lg text-green-800">
          {`₹ ${props.itemPrice}`}
        </div>
      </div>
      <div>
        {props.addedQuantity === 0 && (
          <button
            className="h-auto w-auto py-2 px-3 bg-green-800 text-white rounded-md font-bold active:bg-green-600"
            onClick={addBtnClickHandler}
          >
            + ADD
          </button>
        )}
        {props.addedQuantity > 0 && (
          <div className="flex justify-center items-center">
            <button
              className="bg-green-900 h-auto w-auto px-2 font-bold text-white text-lg rounded-md mr-2 active:bg-green-600"
              onClick={() => {
                chngQuanHandler({
                  id: props.itemId,
                  newQty: props.addedQuantity + 1,
                  newTotAmnt: totAmnt + props.itemPrice,
                });
              }}
            >
              +
            </button>
            <div className="font-bold text-lg">{props.addedQuantity}</div>
            <button
              className="bg-green-900 h-auto w-auto px-[10px] font-bold text-white text-lg rounded-md ml-2 active:bg-green-600"
              onClick={() => {
                chngQuanHandler({
                  id: props.itemId,
                  newQty: props.addedQuantity - 1,
                  newTotAmnt: totAmnt - props.itemPrice,
                });
              }}
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleItem;
