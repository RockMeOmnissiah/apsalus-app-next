import PaypalWrapper from './paypal-wrapper';
import { PayPalButtons } from "@paypal/react-paypal-js";

import { useRouter } from 'next/router';
import { Guard_ReactSailsAPIErrors } from '../../../guards/error';

export default function PaypalCheckout({me, fullName, shippingAddress, cartItems, amount, items, usesShipping, onRemove,
  setOrderID, setBillingDetails, setSucceeded, setPaypalErrorMessage }) {

  const router = useRouter();

  let createOrder = (data, actions) => {

    let purchaseUnits = items;
    if (usesShipping) {

      purchaseUnits[0].shipping = {
        name:{
            full_name: fullName
        },
        address: shippingAddress
      };

    }

    return actions.order
      .create({
        amount: amount,
        purchase_units: purchaseUnits,
        application_context: (usesShipping ? {
          brand_name: 'Apsalus Tech',
          shipping_preference: "SET_PROVIDED_ADDRESS",
        } : {
          brand_name: 'Apsalus Tech',
          shipping_preference: "NO_SHIPPING",
        }),
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  let onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {

      const {payer} = details;
      setBillingDetails(payer);
      setSucceeded(true);
    }).catch(err => setPaypalErrorMessage("Something went wrong."));
  };


  let onClick = async (data, actions) => {

    let productData;
    let issueFound = false;
    let apiSyncComplete = false;
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

          let responseJson = await response.json();

          if (productData) {
            productData.push(responseJson);
          } else {
            productData = [ responseJson ];
          }

          if (cartItems[idx].qty > productData[idx].stockOnHand) {
            setPaypalErrorMessage(productData[idx].title + ' has ' + productData[idx].stockOnHand + ' in stock.');
            issueFound = true;
          }

          if (idx == (cartItems.length - 1)) { apiSyncComplete = true; }
        }
      });
    }

    for(let i = 0; i < cartItems.length; i++) {
      callAPI(cartItems[i].id, i);
    }
    while(!apiSyncComplete) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    return (issueFound ? actions.reject() : actions.resolve());
  }

  return <>
    {me && <PaypalWrapper
      innerContent={<>
        <PayPalButtons
          style={{
            color: "gold",
            shape: "pill",
            label: "checkout",
            layout: "vertical",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onClick={onClick}
        >
          <h3 style={{ color: "#dc3545", textTransform: "capitalize" }}>
            Not eligible to pay with Venmo on this device.
          </h3>
        </PayPalButtons>
      </>}
    />}
  </>;
}
