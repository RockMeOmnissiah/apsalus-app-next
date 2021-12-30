import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCashRegister, faMinus, faPlus, faTimes, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import PaypalCheckout from '../ecommerce/paypal/paypal-checkout';

import { useRouter } from 'next/router';
import { Guard_ReactSailsAPIErrors } from "../../guards/error";
import ApplyPromoCode from "./apply-promo-code";
import { FREE_SHIP_ORDER_PRICE } from "../../utils/constants";

import FullNameField from '../form-fields/fullNameField';
import SubmitButton from '../form-fields/submitButton';
import Address1Field from "../form-fields/address1Field";
import Address2Field from "../form-fields/address2Field";
import CityField from "../form-fields/cityField";
import StateField from "../form-fields/stateField";
import PostalCodeField from "../form-fields/postalCodeField";
import CountryCodeField from "../form-fields/countryCodeField";
import ShippingOptionsField from "../form-fields/shippingOptionsField";

export default function CartBasket({me, cartItems, onAdd, onRemove}) {

  try { window } catch (e) { return <></>; }

  const router = useRouter();

  const shippingFullNameStorageKey = 'helloBob';
  let localNameValue = localStorage.getItem(shippingFullNameStorageKey);
  const [shipFullName, setShipFullName] = useState((localNameValue != null) ? JSON.parse(localNameValue) : undefined);

  const shippingAddressStorageKey = 'heyGeorge';
  let localAddressValue = localStorage.getItem(shippingAddressStorageKey);
  const [shipData, setShipData] = useState((localAddressValue != null) ? JSON.parse(localAddressValue) : undefined);

  const [taxRate, setTaxRate] = useState(0);
  const [shippingOptions, setShippingOptions] = useState(undefined);
  const [shippingEstDate, setShippingEstDate] = useState('');
  const [physicalShippingCost, setPhysicalShippingCost] = useState(0);
  const [isShippingClosed, setIsShippingClosed] = useState(false);

  const [ discountPercent, setDiscountPercent ] = useState(0);
  const cartQtyCount = cartItems.length > 0 ? cartItems.reduce((a, c) => a + c.qty * 1, 0) : 0;
  const subtotal = (cartItems.length > 0 ?
    cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    :
    0);
  const taxPrice = (subtotal + (-subtotal * discountPercent)) * taxRate;
  const physicalItemsShippingWeights = cartItems.map((item) => {
    if (item.isPhysical) {
      return (item.qty * item.shippingWeightLBs);
    }
    return 0;
  });
  const physicalShippingWeight = (physicalItemsShippingWeights.length > 0) ? physicalItemsShippingWeights.reduce((a, c) => a + c, 0) : 0;
  const shippingPrice = ((subtotal > FREE_SHIP_ORDER_PRICE) && shipData && shipData.country_code?.toUpperCase() == 'US') ? 0 : physicalShippingCost;
  const totalPrice = subtotal + taxPrice + shippingPrice + (-subtotal * discountPercent);

  const { register, setValue, getValues, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    defaultValues: {
      fullName: shipFullName || '',
      address_line_1: shipData?.address_line_1 || '',
      address_line_2: shipData?.address_line_2 || '',
      admin_area_2: shipData?.admin_area_2 || '',
      admin_area_1: shipData?.admin_area_1 || '',
      postal_code: shipData?.postal_code || '',
      country_code: shipData?.country_code || '',
    }
  });
  const onSubmitAddressChange = async (data) => {
    setShipFullName(data.fullName);

    let newShipData = {
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      admin_area_2: data.admin_area_2,
      admin_area_1: data.admin_area_1,
      postal_code: data.postal_code,
      country_code: data.country_code,
    };
    setShipData(newShipData);
    localStorage.setItem(shippingFullNameStorageKey,
      JSON.stringify(data.fullName));
    localStorage.setItem(shippingAddressStorageKey,
      JSON.stringify(newShipData));

    // update shipping + tax rate based on address
    await fetch('/api/csrfToken', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( async(csrfResponse) => {

      let csrfToken = (await csrfResponse.json())._csrf;

      let taxData = {};
      taxData._csrf = csrfToken;
      taxData.country_code = data.country_code;
      taxData.state_code = data.admin_area_1;

      await fetch('/api/tax-rate', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taxData),
      }).then( async (taxResponse) => {
        if( Guard_ReactSailsAPIErrors(router, taxResponse) ) {
          setTaxRate(await taxResponse.json());
        }
      });

      let shippingData = {};
      shippingData._csrf = csrfToken;
      shippingData.postal_code = data.postal_code;
      shippingData.country_code = data.country_code;
      shippingData.shippingWeightLBs = physicalShippingWeight;
      shippingData.valueOfContents = subtotal;

      await fetch('/api/shipping-rate', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shippingData),
      }).then( async (shippingResponse) => {
        if( Guard_ReactSailsAPIErrors(router, shippingResponse) ) {

          let shippingResponseJson = (await shippingResponse.json());

          let shippingRates = [];
          if (shippingResponseJson.package.service) { // INTL
            shippingResponseJson.package.service.map(opt => {
              if (physicalShippingWeight < opt.maxWeight) {

                let shipTime;
                if (opt.svcCommitments.indexOf('-') != -1) {
                  shipTime = opt.svcCommitments.split('-')[1].trim().split(' ')[0];
                } else {
                  shipTime = 30;
                }
                const shippingDate_YYYY_MM_DD = (new Date(Date.now() + shipTime * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

                let newItem = { rate: opt.postage, commitmentDate: shippingDate_YYYY_MM_DD };
                if (shippingRates.find(x => (x.rate == newItem.rate)) == undefined) {
                  shippingRates.push(newItem);
                }
                // sort on price
                shippingRates.sort(function(a, b) {
                  if (parseFloat(a.rate) > parseFloat(b.rate)) return 1;
                  else if (parseFloat(a.rate) < parseFloat(b.rate)) return -1;
                  else return 0;
              });
              }
            });
          } else { // DOMESTIC

            const shippingDate_YYYY_MM_DD = (new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

            shippingResponseJson.package.map(opt => {
              if (opt.postage) {
                shippingRates.push({
                  rate: opt.postage.rate,
                  commitmentDate: (opt.postage.commitmentDate ? opt.postage.commitmentDate : shippingDate_YYYY_MM_DD)
                });
              }
            });
          }
          setShippingOptions(shippingRates);
          if (shippingRates[0]) {
            setShippingEstDate(shippingRates[0].commitmentDate);
            setPhysicalShippingCost(parseFloat(shippingRates[0].rate));
          } else {
            setShippingEstDate('');
            setPhysicalShippingCost(0);
          }
        }
      });

    });

    setIsShippingClosed(true);
  };

  let addressForm = (
    <form className="w-full max-w-lg my-2 text-base-content" onSubmit={handleSubmit(onSubmitAddressChange)}>

      <FullNameField register={register} isSubmitting={isSubmitting} errors={errors} />
      <Address1Field register={register} isSubmitting={isSubmitting} errors={errors} />
      <Address2Field register={register} isSubmitting={isSubmitting} errors={errors} />
      <CityField register={register} isSubmitting={isSubmitting} errors={errors} />
      <StateField register={register} isSubmitting={isSubmitting} errors={errors} />
      <PostalCodeField register={register} isSubmitting={isSubmitting} errors={errors} />
      <CountryCodeField register={register} isSubmitting={isSubmitting} errors={errors} />

      <div className="mt-4 text-right">
        <label onClick={()=>{
          setShipFullName(undefined);
          setShipData(undefined);
          setTaxRate(0);
          setShippingEstDate('');
          setShippingOptions(undefined);
          setValue('fullName', '');
          setValue('address_line_1', '');
          setValue('address_line_2', '');
          setValue('admin_area_2', '');
          setValue('admin_area_1', '');
          setValue('postal_code', '');
          setValue('country_code', '');
        }} className="btn btn-warning btn-sm mr-2">Clear</label>
        <SubmitButton btnColorClass={'btn-primary'} innerText={'Update'} isSubmitting={isSubmitting} />
      </div>
    </form>
  );

  // paypal state data
  const [ paypalErrorMessage, setPaypalErrorMessage ] = useState("");
  const [ billingDetails, setBillingDetails ] = useState("");
  const [ shouldBeOpen, setShouldBeOpen ] = useState(false);
  const [ showCheckout, setShowCheckout ] = useState(false);
  const [ orderID, setOrderID ] = useState(false);
  const [ succeeded, setSucceeded ] = useState(false);
  // have we logged the order ourselves?
  const [ orderCreatedInternally, setOrderCreatedInternally ] = useState(false);

  const [ promoCodes, setPromoCodes ] = useState([]);
  useEffect(()=>{

    async function callAPI() {

      // await fetch('/api/csrfToken', {
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // }).then( async(response) => {

        // let data = {};
        // data._csrf = (await response.json())._csrf;

        await fetch('/api/promo-code', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(data),
        }).then( async (promoCodeResponse) => {
          if( Guard_ReactSailsAPIErrors(router, promoCodeResponse) ) {
            setPromoCodes(await promoCodeResponse.json());
          }
        });

      // });
    }
    if (promoCodes.length == 0) {
      callAPI();
    }
    if (me && shipData && (taxRate == 0) && (cartItems.length > 0)) { onSubmitAddressChange(getValues()); }
  }, [cartItems]);

  useEffect(()=>{
    setShowCheckout(false);
    setPaypalErrorMessage('');

    if (succeeded && !orderCreatedInternally) {

      async function callAPI() {

        await fetch('/api/csrfToken', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then( async(response) => {

          let data = {
            fullName: billingDetails.name.given_name + ' ' + billingDetails.name.surname,
            user_id: me.id,
            emailAddress: billingDetails.email_address,
            external_order_id: orderID,
            external_payer_id: billingDetails.payer_id,
            country_code: billingDetails.address.country_code,
            status: 'received',
            shipToFullName: shipFullName,
            shipToAddress1: shipData.address_line_1,
            shipToAddress2: shipData.address_line_2,
            shipToCity: shipData.admin_area_2,
            shipToState: shipData.admin_area_1,
            shipToZip: shipData.postal_code,
            shipToCountry: shipData.country_code,
            shipToEstDate: shippingEstDate,
            itemized: cartItems.map((cItem, idx) => {
              return (idx > 0 ? ' ' : '') + cItem.qty + 'x ' + cItem.title
            }).toString(),
            cartItems: cartItems,
            subtotal: subtotal.toFixed(2),
            taxPrice: taxPrice.toFixed(2),
            shippingPrice: shippingPrice.toFixed(2),
            discountPrice: (-subtotal * discountPercent).toFixed(2),
            totalPrice: totalPrice.toFixed(2),
            shippingWeightLBs: physicalShippingWeight.toFixed(1),
          };
          data._csrf = (await response.json())._csrf;

          await fetch('/api/order/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then( async (createResponse) => {
            if( Guard_ReactSailsAPIErrors(router, createResponse) ) {

              setOrderCreatedInternally(true);
            }
          });

        });
      }
      callAPI();
    }
  }, [cartItems, succeeded]);

  // clear cart after purchase
  if (succeeded && orderCreatedInternally && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      for (let j = 0; j < cartItems[i].qty; j++) {
        onRemove(cartItems[i]);
      }
    }
  }

  return <>
    <div className={"dropdown dropdown-end w-full " + ((shouldBeOpen) ? 'dropdown-open' : '')}
      // onMouseLeave={() => { setShouldBeOpen(false); }}
    >
      <button tabIndex='0' type="button"
        className="btn btn-accent btn-outline btn-sm w-full"
        onClick={() => { setShouldBeOpen(true); }}>
        <span className="mr-2">Cart</span>
        <FontAwesomeIcon icon={faCartArrowDown} />
        <div className="badge badge-sm ml-4">{cartQtyCount}</div>
      </button>
      {shouldBeOpen && <span tabIndex='0' style={{zIndex: 1000}}
        className="p-2 shadow card bordered dropdown-content bg-neutral-focus text-neutral-content rounded-box w-96">


        <div className="card-body pt-1 p-4 overflow-visible">
          <h1 className="card-title text-accent text-center text-2xl mb-1">
            Shopping Cart
            <button
              className="btn btn-primary btn-outline btn-square btn-xs float-right"
              onClick={() => { setShouldBeOpen(false); }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </h1>
          <hr className="w-3/4 mx-auto pb-4" />

          {(me && (me.emailChangeCandidate || (me.emailStatus === 'unconfirmed'))) ?

            <div className="alert alert-warning">
              <div className="flex-1">
                <FontAwesomeIcon icon={faUserAltSlash} size="lg" />
                <label className="ml-2"><strong>Your account needs verification to make a purchase.</strong></label>
              </div>
            </div>
          :
            <>
            {paypalErrorMessage && <>
              <div className="alert alert-warning mb-4">
                <div className="flex-1">
                  <FontAwesomeIcon icon={faUserAltSlash} size="lg" />
                  <label className="ml-2"><strong>{paypalErrorMessage}</strong></label>
                </div>
              </div>
            </>}

            {(succeeded && orderCreatedInternally) && <>
              <div className="mx-auto text-secondary text-lg sm:text-xl">Thank You!</div>
              <div className="mx-auto">We have received Order #</div>
              <div className="mx-auto text-secondary">{orderID}</div>
            </>}
            {!(succeeded && orderCreatedInternally) && <>
            <>
              <div
                className={((showCheckout || isShippingClosed) ? 'collapse-close' : '') +
                  " collapse border rounded-box border-base-300 bg-gray-700 collapse-arrow mb-4"}
              >
                <input type="checkbox" onClick={()=>{ setIsShippingClosed(false); }} />
                <div className={(shipData ? '' : 'pt-4') + " collapse-title rounded-lg text-sm font-medium py-2"}>
                  {shipData ?
                    <>
                    <div className="pl-4 text-accent text-md bg-gray-600 rounded-lg">Ship To: </div>
                    <div className="pt-1 pl-8 text-sm">
                      <div>{shipFullName}</div>
                      <div>{shipData.address_line_1} {shipData.address_line_2}</div>
                      <div>{shipData.admin_area_2} {shipData.admin_area_1} {shipData.postal_code}</div>
                      <div>{shipData.country_code}</div>
                    </div>

                    </>
                  :
                    <>
                    <div className="pl-4 text-warning text-lg bg-gray-600 rounded-lg">Enter Shipping Info</div>
                    </>
                  }
                </div>
                <div className="collapse-content">
                  {addressForm}
                </div>
              </div>
            </>

            {cartItems.length === 0 && <div className="mx-auto text-lg sm:text-xl">Cart is Empty</div>}
            {cartItems.map((item) => {
              return <div key={item.id} className="grid grid-cols-6 pb-2">
                <div className="col-span-2">
                  <div className={(item.stockOnHand <= 0 ? 'line-through text-gray-400' : '')}>
                    {item.title}
                  </div>
                  {(item.stockOnHand <= 0) && <>
                    <span className="badge badge-sm badge-warning">Sold Out</span>
                    </>}
                </div>
                <div className="col-span-2 mx-auto">
                  {!showCheckout && <>
                    <button onClick={() => onRemove(item)} className="btn btn-error btn-outline btn-square btn-xs">
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    {<button onClick={() => onAdd(item)}
                      className={"ml-2 btn btn-success btn-square btn-xs " +
                        ((item.stockOnHand <= item.qty) ? 'btn-disabled' : 'btn-outline')}
                      disabled={(item.stockOnHand <= item.qty)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>}
                  </>}
                </div>

                <div className="col-span-2 text-right">
                  <span className="text-sm text-gray-300">
                    {item.qty} x
                  </span>
                  <span className="ml-1">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              })}

            {cartItems.length !== 0 && <>

              <div className="grid grid-cols-3 text-gray-300 text-sm">
                <div className="col-span-2">Weight</div>
                <div className="col-span-1 text-right">{physicalShippingWeight.toFixed(1)} LBs</div>
              </div>

              <hr className="my-2" />

              {(discountPercent != 0) && <>
                <div className="grid grid-cols-3 text-gray-300 text-sm">
                  <div className="col-span-2">Item Total</div>
                  <div className="col-span-1 text-right">${subtotal.toFixed(2)}</div>
                </div>
                <div className="grid grid-cols-3 text-red-300 text-sm sm:text-md">
                  <div className="col-span-2">Discount</div>
                  <div className="col-span-1 text-right">${(-subtotal * discountPercent).toFixed(2)}</div>
                </div>
              </>}

              <div className="grid grid-cols-3 text-gray-300 text-sm">
                <div className="col-span-2">Subtotal</div>
                <div className="col-span-1 text-right">${(subtotal + (-subtotal * discountPercent)).toFixed(2)}</div>
              </div>

              <div className="mb-2">
                <ApplyPromoCode
                  promoCodes={promoCodes}
                  showInput={!showCheckout}
                  subtotal={subtotal}
                  setDiscountPercent={setDiscountPercent}
                />
              </div>

              {((physicalShippingWeight > 0) && shipData && shippingOptions) && <div className="mb-2">
                <ShippingOptionsField
                  shippingOptions={shippingOptions}
                  isDisabled={showCheckout || (shippingPrice == 0)}
                  setShippingEstDate={setShippingEstDate}
                  setPhysicalShippingCost={setPhysicalShippingCost}
                />
              </div>}
              {(((physicalShippingCost > 0) && shipData) || (!physicalShippingCost)) && <>
                <div className="grid grid-cols-3 text-gray-300 text-sm">
                  {(shippingPrice > 0) && <div className="col-span-2">Shipping</div>}
                  {(shippingPrice == 0) && <>
                    <div className="col-span-2 line-through">
                      Shipping <div className="badge badge-primary badge-sm ml-2">FREE</div>
                    </div>
                    </>}
                  <div className="col-span-1 text-right">
                    ${shippingPrice.toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-3 text-gray-300 text-sm">
                  <div className="col-span-2">Tax ( {(taxRate * 100).toFixed(2)} % )</div>
                  <div className="col-span-1 text-right">${taxPrice.toFixed(2)}</div>
                </div>
              </>}

              {(((physicalShippingCost > 0) && shipData) || (!physicalShippingCost)) && <>
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                    <strong>Total</strong>
                  </div>
                  <div className="col-span-1 text-right">
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </>}
              {(shipData) && <>
                <hr className="my-2" />
                <div className="p-4 pb-2 w-full bg-gray-200 rounded-lg border">
                  <div className="mx-auto">
                    {!showCheckout && <>
                      <div className="mb-2">
                        <button
                          className="btn w-full btn-success" type="button"
                          onClick={() => { setShowCheckout(true); }}>
                          Checkout
                          <FontAwesomeIcon className="ml-2" icon={faCashRegister} />
                        </button>
                      </div>
                    </>}
                    {showCheckout && <>
                      <div className="mb-4">
                        <button
                          className="btn w-full btn-info btn-outline" type="button"
                          onClick={() => { setShowCheckout(false); }}>
                          Edit Cart
                          <FontAwesomeIcon className="ml-2" icon={faCartArrowDown} />
                        </button>
                      </div>
                      <PaypalCheckout
                        me={me}
                        fullName={shipFullName}
                        shippingAddress={shipData}
                        cartItems={cartItems}
                        setOrderID={setOrderID}
                        setBillingDetails={setBillingDetails}
                        setSucceeded={setSucceeded}
                        setPaypalErrorMessage={setPaypalErrorMessage}
                        onRemove={onRemove}
                        usesShipping={physicalShippingWeight > 0}
                        amount={shippingPrice ?
                          {
                            currency_code: "USD",
                            value: totalPrice.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: subtotal.toFixed(2),
                                },
                                shipping: {
                                    currency_code: "USD",
                                    value: shippingPrice.toFixed(2),
                                },
                                tax_total: {
                                    currency_code: "USD",
                                    value: taxPrice.toFixed(2),
                                },
                            }
                          }
                        :
                          {
                            currency_code: "USD",
                            value: totalPrice.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: subtotal.toFixed(2),
                                },
                                tax_total: {
                                    currency_code: "USD",
                                    value: taxPrice.toFixed(2),
                                },
                            }
                          }
                        }
                        items={[{
                            amount: {
                              currency: 'USD',
                              value: totalPrice.toFixed(2)
                            },
                            description: cartItems.map((cItem, idx) => {
                              return (idx > 0 ? ' ' : '') + cItem.qty + 'x ' + cItem.title
                            }).toString()
                          }
                        ]}
                      />
                    </>}
                  </div>
                </div>
              </>}

              </>}
            </>}
            </>
          }

        </div>



      </span>}
    </div>
  </>;
}
