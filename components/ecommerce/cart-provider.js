import { useEffect, useState } from 'react';
import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useRouter } from 'next/router';

export default function CartProvider({innerContent}) {

  try { window } catch (e) { return <>{innerContent([], ()=>{}, ()=>{})}</>; }

  const router = useRouter();

  const cartItemsStorageKey = 'meowZoo';

  const [productData, setProductData] = useState([]);
  const [apiSyncComplete, setApiSyncComplete] = useState(false);
  useEffect(() => {
    async function callAPI(productID, idx) {

      await fetch('/api/product/' + productID, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {

          // bring over existing cart qty when syncing with API
          let responseJson = await response.json();
          const exist = cartItems.find((x) => x.id === responseJson.id);
          if (exist) { responseJson.qty = exist.qty; }

          if (productData) {
            let newProdData = productData;
            newProdData.push(responseJson)
            setProductData(newProdData);
          } else {
            setProductData([ responseJson ])
          }

          if (idx == (cartItems.length - 1) && productData) {
            localStorage.setItem(cartItemsStorageKey,
              JSON.stringify(productData));
            setApiSyncComplete(true);
          }
        }
      });
    }

    if (cartItems) {
      for(let i = 0; i < cartItems.length; i++) {
        callAPI(cartItems[i].id, i);
      }
    }

  }, []);
  if (!apiSyncComplete && cartItems) { return <>{innerContent([], onAdd, onRemove)}</>; }

  let localValue = localStorage.getItem(cartItemsStorageKey);
  const [cartItems, setCartItems] = useState((localValue != null) ? JSON.parse(localValue) : []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      localStorage.setItem(cartItemsStorageKey,
        JSON.stringify(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
          )
        )
      );
    } else {
      localStorage.setItem(cartItemsStorageKey,
        JSON.stringify([...cartItems, { ...product, qty: 1 }])
      );
    }
    setCartItems(JSON.parse(localStorage.getItem(cartItemsStorageKey)));
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      localStorage.setItem(cartItemsStorageKey,
        JSON.stringify(
          cartItems.filter((x) => x.id !== product.id)
        )
      );
    } else {
      localStorage.setItem(cartItemsStorageKey,
        JSON.stringify(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        )
      );
    }
    setCartItems(JSON.parse(localStorage.getItem(cartItemsStorageKey)));
  };

  return <>
    {innerContent(cartItems, onAdd, onRemove)}
  </>
}
