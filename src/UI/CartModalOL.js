const CartModalOL = (props) => {
  return (
    <div
      className={`animated fade-in-up bg-black bg-opacity-80 fixed inset-0 justify-center items-center h-auto ${props.cName} z-20`}
    >
      {props.children}
    </div>
  );
};
export default CartModalOL;
