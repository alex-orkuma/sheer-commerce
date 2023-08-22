import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button-component";
import "./cart-dropdown.styles.jsx";
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../contexts/cart.context";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItemContainer,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const navigate = useNavigate();

  const gotoNavigateHandler = () => {
    navigate("/checkout");
  };

  const { cartItems } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartItemContainer>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItemContainer>
      <Button onClick={gotoNavigateHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
