import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../cart-icon/cart-icon.component";
import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { SignOutUser } from "../../../utils/firebase.utils";

import {
  LogoContainer,
  NavLinks,
  NavigationContainer,
  NavLink,
} from "./Navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink>
            {currentUser ? (
              <NavLink as="span" onClick={SignOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/auth">SIGN IN</NavLink>
            )}
          </NavLink>
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
