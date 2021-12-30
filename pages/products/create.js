import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from '../../components/form-fields/submitButton';
import TitleField from '../../components/form-fields/titleField';
import DescriptionField from '../../components/form-fields/descriptionField';
import ImageUrlsField from '../../components/form-fields/imageUrlsField';
import IsPhysicalField from '../../components/form-fields/isPhysicalField';
import PriceField from '../../components/form-fields/priceField';
import CategoriesField from '../../components/form-fields/categoriesField';
import StockOnHandField from '../../components/form-fields/stockOnHandField';
import ImageFileField from '../../components/form-fields/imageFileField';
import ShippingWeightField from '../../components/form-fields/shippingWeightField';

export default function Create({ me, categoryOptions }) {

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

  const { register, getValues, setValue, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm({
    defaultValues: {}
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

      await fetch('/api/product/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/products');
        }
      });

    });
  }

  const isPhysical = watch('isPhysical');

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Create Product</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Create Product
          <FontAwesomeIcon className="ml-4" icon={faBoxes} size="xs" />
        </h1>

        <form className="w-full max-w-lg my-2" onSubmit={handleSubmit(onSubmit)}>

          <TitleField register={register} isSubmitting={isSubmitting} errors={errors} />
          <DescriptionField register={register} isSubmitting={isSubmitting} errors={errors} />
          <CategoriesField register={register} isSubmitting={isSubmitting} errors={errors}
            categoryOptions={categoryOptions} />
          <ImageUrlsField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ImageFileField isSubmitting={isSubmitting} getValues={getValues} setValue={setValue} />
          <IsPhysicalField register={register} isSubmitting={isSubmitting} errors={errors}
            isPhysical={isPhysical} />
          <PriceField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ShippingWeightField register={register} isSubmitting={isSubmitting} errors={errors} />
          <StockOnHandField register={register} isSubmitting={isSubmitting} errors={errors} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Create'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

Create.getInitialProps = ({ query: { me, categoryOptions } }) => {
  return { me, categoryOptions };
}
