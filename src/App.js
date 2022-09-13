import React, { useState } from "react";
import Container from "./UI/Container";
import Header from "./UI/Header";
import Banner from "./UI/Banner";
import FoodItems from "./Components/FoodItems";
import CartModalOL from "./UI/CartModalOL";
import CartModal from "./UI/CartModal";

const foodItemsArr = [
  {
    id: "f1",
    itemName: "Lentil Bolognese",
    itemDesc:
      "Rich and robust, this plant-based Lentil Bolognese is hearty, “meaty” and full of depth of flavor. Toss it with your favorite pasta, or spoon it over creamy polenta- either way, this simple nourishing vegan meal is one the whole family will enjoy.",
    itemPrice: 650,
    addedQuantity: 0,
  },
  {
    id: "f2",
    itemName: "Frankies! (Bombay Burritos)",
    itemDesc:
      "India’s flavorful street food -also called a Bombay Burrito, made healthy! This vegan version is bursting with so much flavor- filled with curry mashed potatoes, roasted Indian cauliflower, chickpeas, fresh spinach, cilantro mint chutney and pickled onions. Absolutely delicious! One of my personal vegan dinner recipes!",
    itemPrice: 400,
    addedQuantity: 0,
  },
  {
    id: "f3",
    itemName: "Whole Roasted Cauliflower With Tahini Sauce",
    itemDesc:
      "A whole cauliflower is roasted in the oven until golden and tender. Seasoned with Zaatar and drizzled with tahini sauce its a delight for the senses -bursting with Middle Eastern flavors. Easy and delicious, it serves 2 perfectly!",
    itemPrice: 475,
    addedQuantity: 0,
  },
  {
    id: "f4",
    itemName: "Vegan Spaghetti and Beetballs",
    itemDesc:
      "Say hello to the most flavorful Vegan Spaghetti and Beetballs!  A beautiful twist on the comforting familiar classic.  Beets, black beans, walnuts and basil make these plant-based meatballs scrumptious and so satisfying.  Top with an easy rustic tomato sauce for a meal the whole family will love! Sprinkle with Vegan Cheesy Sprinkle!",
    itemPrice: 900,
    addedQuantity: 0,
  },
];

const cartItemsArr = JSON.parse(localStorage.getItem("cartItems")) || [];

function App() {
  const [foodItems, setFoodItems] = useState(
    JSON.parse(localStorage.getItem("foodItems")) || foodItemsArr
  );
  const [cartItems, setCartItems] = useState(cartItemsArr);
  const [viewCart, setViewCart] = useState("hidden");
  const [totalCartAmount, setTotalCartAmount] = useState(
    Number(localStorage.getItem("totAmnt")) || 0
  );
  const [orderPlaced, setOrderPlaced] = useState(false);

  const itemAddHandler = (itemAdded) => {
    setCartItems([...cartItems, itemAdded]);
    localStorage.setItem(
      "cartItems",
      JSON.stringify([...cartItems, itemAdded])
    );
    setFoodItems(
      foodItems.map((item) => {
        if (item.id === itemAdded.id) {
          item.addedQuantity = 1;
        }
        return item;
      })
    );
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
  };

  const viewCartHandler = () => {
    setViewCart("block");
  };
  const modalCloseHandler = () => {
    setViewCart("hidden");
    setOrderPlaced(false);
  };
  const chngItemQtyHandler = (chngItemDetails) => {
    setFoodItems(
      foodItems.map((item) => {
        if (item.id === chngItemDetails.id) {
          item.addedQuantity = chngItemDetails.newQty;
        }
        return item;
      })
    );
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
    if (chngItemDetails.newQty > 0) {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === chngItemDetails.id) {
            item.addedQuantity = chngItemDetails.newQty;
          }
          return item;
        })
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      const NewCart = cartItems.filter(
        (item) => item.id !== chngItemDetails.id
      );
      setCartItems(NewCart);
      localStorage.setItem("cartItems", JSON.stringify(NewCart));
    }
  };
  const newTotAmntHandler = (newTotAmnt) => {
    setTotalCartAmount(newTotAmnt);
    localStorage.setItem("totAmnt", JSON.stringify(newTotAmnt));
  };
  const orderPlaceHandler = () => {
    setOrderPlaced(true);
    const emptyCartItems = [];
    setCartItems(emptyCartItems);
    localStorage.setItem("cartItems", JSON.stringify(emptyCartItems));
    const updtFoodQty = foodItems.map((item) => {
      item.addedQuantity = 0;
      return item;
    });
    setFoodItems(updtFoodQty);
    localStorage.setItem("foodItems", JSON.stringify(updtFoodQty));
    setTotalCartAmount(0);
    localStorage.setItem("totAmnt", JSON.stringify(0));
  };
  return (
    <>
      <CartModalOL cName={viewCart}>
        <CartModal
          onClose={modalCloseHandler}
          cartItems={cartItems}
          chngItemQty={chngItemQtyHandler}
          totAmnt={totalCartAmount}
          newTotAmnt={newTotAmntHandler}
          orderPlaced={orderPlaced}
          orderPlaceHandler={orderPlaceHandler}
        ></CartModal>
      </CartModalOL>

      <Container>
        <Header cartItems={cartItems} onViewCart={viewCartHandler}></Header>
        <Banner></Banner>
        <FoodItems
          foodItems={foodItems}
          itemAdded={itemAddHandler}
          chngItemQty={chngItemQtyHandler}
          totAmnt={totalCartAmount}
          newTotAmnt={newTotAmntHandler}
        ></FoodItems>
      </Container>
    </>
  );
}

export default App;
