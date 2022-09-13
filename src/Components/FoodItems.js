import React from "react";
import SingleItem from "./SingleItem";

const FoodItems = (props) => {
  const itemAddedHandler = (itemAdded) => {
    props.itemAdded(itemAdded);
  };
  const chngQuanHandler = (chngItemDetails) => {
    props.chngItemQty(chngItemDetails);
  };
  const newTotAmntHandler = (newTotAmnt) => {
    props.newTotAmnt(newTotAmnt);
  };
  return (
    <div className="flex justify-center flex-col mt-4 w-full items-center">
      {props.foodItems.map((item) => {
        return (
          <SingleItem
            key={item.id}
            itemId={item.id}
            itemName={item.itemName}
            itemDesc={item.itemDesc}
            itemPrice={item.itemPrice}
            addedQuantity={item.addedQuantity}
            itemAdded={itemAddedHandler}
            chngItemQty={chngQuanHandler}
            totAmnt={props.totAmnt}
            newTotAmnt={newTotAmntHandler}
          />
        );
      })}
    </div>
  );
};

export default FoodItems;
