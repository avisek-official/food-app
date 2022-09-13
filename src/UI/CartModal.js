const CartModal = (props) => {
  let totAmnt = props.totAmnt;
  const olClickHandler = () => {
    props.onClose();
  };
  const chngQuanHandler = (chngItemDetails) => {
    props.chngItemQty(chngItemDetails);
    props.newTotAmnt(chngItemDetails.newTotAmnt);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="h-max bg-white rounded p-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <div className="w-full flex justify-center">
          <div className="header font-bold">Your Cart</div>
        </div>
        <div className="line h-0.5 w-full bg-gray-400"></div>
        <div className="body py-4">
          {props.cartItems.length === 0 && !props.orderPlaced && (
            <div className="w-full flex justify-center flex-col items-center font-bold">
              <img
                src={require("./images/cart.png")}
                width="80px"
                height="80px"
                alt="empty cart"
              />
              <br />
              <div>No Item in the Cart</div>
            </div>
          )}
          {props.cartItems.length > 0 &&
            !props.orderPlaced &&
            props.cartItems.map((cartItem) => {
              return (
                <div
                  className="cartItem w-full flex justify-between p-2 shadow-lg rounded-md bg-gradient-to-r from-green-300 to-white my-1"
                  key={cartItem.id}
                >
                  <div className="flex flex-wrap w-[50%] text-justify">
                    <b>{cartItem.itemName}</b>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-green-900 h-auto w-auto px-2 font-bold text-white text-lg rounded-md mr-2 active:bg-green-600"
                      onClick={() => {
                        chngQuanHandler({
                          id: cartItem.id,
                          newQty: cartItem.addedQuantity + 1,
                          newTotAmnt: totAmnt + cartItem.itemPrice,
                        });
                      }}
                    >
                      +
                    </button>
                    <div className="font-bold text-lg">
                      {cartItem.addedQuantity}
                    </div>
                    <button
                      className="bg-green-900 h-auto w-auto px-[10px] font-bold text-white text-lg rounded-md ml-2 active:bg-green-600"
                      onClick={() => {
                        chngQuanHandler({
                          id: cartItem.id,
                          newQty: cartItem.addedQuantity - 1,
                          newTotAmnt: totAmnt - cartItem.itemPrice,
                        });
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <b>{cartItem.addedQuantity * cartItem.itemPrice}</b>
                  </div>
                </div>
              );
            })}
          {props.cartItems.length > 0 && !props.orderPlaced && (
            <div className="cartItem w-full flex justify-between p-2 shadow-lg rounded-md">
              <div className="text-xl font-bold text-green-900">
                Total Amount to Pay:
              </div>{" "}
              <div className="text-xl font-bold text-green-900">{totAmnt}</div>
            </div>
          )}
          {props.orderPlaced && (
            <div className="w-full flex justify-center flex-col items-center font-bold">
              <img
                src={require("./images/done.gif")}
                width="200px"
                height="200px"
                alt="empty cart"
              />
              <br />
              <div className="flex justify-center text-center text-lg font-bold">
                Order Placed
                <br />
                Happiness is on the way :)
              </div>
            </div>
          )}
        </div>
        <div className="footer flex justify-end">
          <button
            className="p-1 mx-4 text-md"
            id="close-modal"
            onClick={olClickHandler}
          >
            Close
          </button>
          {props.cartItems.length > 0 && !props.orderPlaced && (
            <button
              className="bg-green-800 rounded shadow-md px-2 text-md font-bold text-white active:bg-green-500"
              onClick={() => {
                props.orderPlaceHandler();
              }}
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartModal;
