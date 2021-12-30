import '../styles/globals.css';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import NavBar from "../components/navbar";
import Footer from "../components/footer";

import CartProvider from '../components/ecommerce/cart-provider';

function MyApp({ Component, pageProps }) {

  return <CartProvider
            innerContent={(cartItems, onAdd, onRemove) => {
              return <NavBar {...pageProps}
                cartItems={cartItems}
                onAddCartItem={onAdd}
                onRemoveCartItem={onRemove}
                innerContent={(cartItems, onAddCartItem, onRemoveCartItem) => {
                  pageProps.cartItems = cartItems;
                  pageProps.onAddCartItem = onAddCartItem,
                  pageProps.onRemoveCartItem = onRemoveCartItem;
                  return <Component {...pageProps} />
                }}
                footer={<Footer {...pageProps} />}
              />
            }}
          />
}

export default MyApp
