import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import FullNameField from '../../components/form-fields/fullNameField';
import EmailAddressField from '../../components/form-fields/emailAddressField';
import ExternalOrderIdField from '../../components/form-fields/externalOrderIdField';
import ExternalPayerIdField from '../../components/form-fields/externalPayerIdField';
import CountryCodeField from '../../components/form-fields/countryCodeField';
import OrderStatusField from '../../components/form-fields/orderStatusField';
import ItemizedField from '../../components/form-fields/itemizedField';
import SubtotalField from '../../components/form-fields/subtotalField';
import TaxPriceField from '../../components/form-fields/taxPriceField';
import ShippingPriceField from '../../components/form-fields/shippingPriceField';
import TotalPriceField from '../../components/form-fields/totalPriceField';
import SubmitButton from '../../components/form-fields/submitButton';
import UserIdField from '../../components/form-fields/userIdField';
import ShippingCarrierField from '../../components/form-fields/shippingCarrierField';
import ShippingTrackingField from '../../components/form-fields/shippingTrackingField';
import DiscountPriceField from '../../components/form-fields/discountPriceField';
import ShipToFullNameField from '../../components/form-fields/shipToFullNameField';
import Address1Field from '../../components/form-fields/address1Field';
import Address2Field from '../../components/form-fields/address2Field';
import CityField from '../../components/form-fields/cityField';
import StateField from '../../components/form-fields/stateField';
import PostalCodeField from '../../components/form-fields/postalCodeField';
import ShipToCountryCodeField from '../../components/form-fields/shipToCountryCodeField';
import ShippingWeightField from '../../components/form-fields/shippingWeightField';
import ShipToEstDateField from '../../components/form-fields/shipToEstDateField';

export default function Update({ me, orderData }) {

  // const [ authorized, setAuthorized ] = useState(null);
  const router = useRouter();
  // useEffect(() => {
  //   async function checkGuards() {

  //     if (await isLoggedInPolicy.Guard_ReactPage(me, router)) {
  //       setAuthorized(true);
  //     }
  //   }
  //   checkGuards();
  // }, []);
  // if (!authorized) { return (null); }

  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    defaultValues: {
      id: orderData.id,
      fullName: orderData.fullName,
      user_id: orderData.user.id,
      emailAddress: orderData.emailAddress,
      external_order_id: orderData.external_order_id,
      external_payer_id: orderData.external_payer_id,
      country_code: orderData.country_code,
      status: orderData.status,
      shipToFullName: orderData.shipToFullName,
      address_line_1: orderData.shipToAddress1,
      address_line_2: orderData.shipToAddress2,
      admin_area_2: orderData.shipToCity,
      admin_area_1: orderData.shipToState,
      postal_code: orderData.shipToZip,
      shipToCountry: orderData.shipToCountry,
      shipToEstDate: orderData.shipToEstDate,
      shippingCarrier: orderData.shippingCarrier,
      shippingTracking: orderData.shippingTracking,
      itemized: orderData.itemized,
      subtotal: orderData.subtotal,
      taxPrice: orderData.taxPrice,
      shippingPrice: orderData.shippingPrice,
      discountPrice: orderData.discountPrice,
      totalPrice: orderData.totalPrice,
      shippingWeightLBs: orderData.shippingWeightLBs,
    }
  });
  const onSubmit = async (data) => {
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 2000);
    // });
    // alert(JSON.stringify(data));

    await fetch('/api/csrfToken', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( async(response) => {

      data._csrf = (await response.json())._csrf;
      data.shipToFullName = data.shipToFullName;
      data.shipToAddress1 = data.address_line_1;
      data.shipToAddress2 = data.address_line_2;
      data.shipToCity = data.admin_area_2;
      data.shipToState = data.admin_area_1;
      data.shipToZip = data.postal_code;
      data.shipToCountry = data.shipToCountry;
      data.shipToEstDate = data.shipToEstDate;

      await fetch('/api/order/update', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/orders');
        }
      });

    });
  }

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Update Order</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Update Order
          <FontAwesomeIcon className="ml-4" icon={faPencilAlt} size="xs" />
        </h1>

        <form className="w-full max-w-lg my-2" onSubmit={handleSubmit(onSubmit)}>

          <HiddenIdField register={register} errors={errors} />
          <ExternalOrderIdField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ExternalPayerIdField register={register} isSubmitting={isSubmitting} errors={errors} />
          <UserIdField register={register} isSubmitting={isSubmitting} errors={errors} />
          <EmailAddressField register={register} isSubmitting={isSubmitting} errors={errors} />
          <FullNameField register={register} isSubmitting={isSubmitting} errors={errors} />
          <CountryCodeField register={register} isSubmitting={isSubmitting} errors={errors} />
          <OrderStatusField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShipToFullNameField register={register} isSubmitting={isSubmitting} errors={errors} />
          <Address1Field register={register} isSubmitting={isSubmitting} errors={errors} />
          <Address2Field register={register} isSubmitting={isSubmitting} errors={errors} />
          <CityField register={register} isSubmitting={isSubmitting} errors={errors} />
          <StateField register={register} isSubmitting={isSubmitting} errors={errors} />
          <PostalCodeField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShipToCountryCodeField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShipToEstDateField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShippingCarrierField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShippingTrackingField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ItemizedField register={register} isSubmitting={isSubmitting} errors={errors} />
          <SubtotalField register={register} isSubmitting={isSubmitting} errors={errors} />
          <TaxPriceField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShippingPriceField register={register} isSubmitting={isSubmitting} errors={errors} />
          <DiscountPriceField register={register} isSubmitting={isSubmitting} errors={errors} />
          <TotalPriceField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShippingWeightField register={register} isSubmitting={isSubmitting} errors={errors} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Update'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

Update.getInitialProps = ({ query: { me, orderData } }) => {
  return { me, orderData };
}
