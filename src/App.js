import { Routes, Route } from "react-router-dom";

import "./components/Routes/home/home.component";
import Home from "./components/Routes/home/home.component";
import Navigation from "./components/Routes/Navigation/Navigation.component";
import Authentication from "./components/Routes/authentication/authentication.component";
import Shop from "./components/Routes/shop/shop.component";
import CheckOut from "./components/Routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
