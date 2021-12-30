import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faBoxes, faTrash } from "@fortawesome/free-solid-svg-icons";

import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';
import ProductCard from '../../components/ecommerce/product-card';

import Banner from '../../components/banner';
import { FREE_SHIP_ORDER_PRICE } from '../../utils/constants';

export default function Recent({ me, products, categoryOptions, cartItems, onAddCartItem, onRemoveCartItem }) {

  const [ activeModal, setActiveModal, /*authorized, setAuthorized*/ ] = useState(null);
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

  const { register, setValue, formState: { errors, isSubmitting }, handleSubmit } = useForm({
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

      await fetch('/api/product/delete', {
        method: 'DELETE',
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

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Recent Products</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Recent Products
          <FontAwesomeIcon className="ml-4" icon={faBoxes} size="xs" />
        </h1>
        <Banner bannerText={"Use code 'welcome-10' for 10% off. Free shipping on US orders over $" + FREE_SHIP_ORDER_PRICE + "!"} />
        <div className="w-full pt-4 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/products/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create Product
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="py-10 mx-auto w-full lg:grid lg:grid-cols-2 lg:gap-6 lg:justify-center">

            {products.map(function(product, idx){
              return <div key={idx}>
                <div className="pt-2 pb-16 mx-auto">
                  {me && me.isSuperAdmin && <>
                    <a href={"/products/update?id=" + product.id }
                      className="btn btn-info btn-outline btn-square btn-sm mb-2 mr-2">
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </a>
                    <label onClick={()=>{
                      setValue('id', product.id);
                      setActiveModal('show-delete-confirm');
                    }} className="btn btn-error btn-outline btn-square btn-sm mb-2">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </label>
                    </>}
                  <ProductCard
                    me={me}
                    router={router}
                    item={product}
                    cartItems={cartItems}
                    onAdd={onAddCartItem}
                    categoryOptions={categoryOptions}
                  />
                </div>
              </div>
            })}

          </div>

        </div>

        {/* Confirm Delete Modal */}
        <input id='show-delete-confirm' className="modal-toggle" type="checkbox" />
        {(activeModal == 'show-delete-confirm') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete Product?</h4>
              <div className="pb-2" />
              <p className="text-base-200 text-bold">This action cannot be undone.</p>
              <form className="w-full my-2" onSubmit={handleSubmit(onSubmit)}>

                <HiddenIdField register={register} errors={errors} />

                <div className="mt-4 modal-action">
                <label onClick={()=>{
                  setActiveModal('');
                }} htmlFor='show-delete-confirm' className="btn btn-warning btn-sm">Cancel</label>
                  <SubmitButton btnColorClass={'btn-error'} innerText={'Delete'} isSubmitting={isSubmitting} />
                </div>
              </form>
            </div>
          </div>}

      </main>

    </div>
  )
}

Recent.getInitialProps = ({ query: { me, products, categoryOptions } }) => {
  return { me, products, categoryOptions };
}
