import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faTrash, faBoxes } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';

import DataTable from '../../components/data-table';
export default function Overview({ me, products, categoryOptions }) {

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
        <title>Products</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Products
          <FontAwesomeIcon className="ml-4" icon={faBoxes} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/products/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create Product
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="pt-2">
            <DataTable
              hiddenColumns={['title', 'categories', 'image_urls', 'isPhysical', 'details_data']}
              columns={[
                {
                  Header: 'TitleData',
                  accessor: 'title',
                  style: { width: '0%' },
                },
                {
                  Header: 'Title',
                  accessor: 'title_display',
                  style: { width: '15%' },
                },
                {
                  Header: 'Description',
                  accessor: 'description',
                  style: { width: '12%' },
                },
                {
                  Header: 'CategoriesData',
                  accessor: 'categories',
                  style: { width: '0%' },
                },
                {
                  Header: 'Categories',
                  accessor: 'categories_display',
                  style: { width: '12%' },
                },
                {
                  Header: 'ImageUrlData',
                  accessor: 'image_urls',
                  style: { width: '0%' },
                },
                {
                  Header: 'Images',
                  accessor: 'image_urls_display',
                  style: { width: '12%' },
                },
                {
                  Header: 'Physical?Data',
                  accessor: 'isPhysical',
                  style: { width: '0%' },
                },
                {
                  Header: 'Ship?',
                  accessor: 'isPhysical_display',
                  style: { width: '10%' },
                },
                {
                  Header: 'DetailsData',
                  accessor: 'details_data',
                  style: { width: '0%' },
                },
                {
                  Header: 'Details',
                  accessor: 'details_display',
                  style: { width: '12%' },
                },
                {
                  Header: 'Created',
                  accessor: 'createdAt',
                  style: { width: '11%' },
                },
                {
                  Header: 'Updated',
                  accessor: 'updatedAt',
                  style: { width: '11%' },
                },
              ]}
              data={products.map(function(product, idx){
                return {
                  key: {idx},
                  title: product.title,
                  title_display: <>
                    <div className="w-full">{product.id}</div>
                    {product.title}
                    <label onClick={()=>{
                      setValue('id', product.id);
                      setActiveModal('show-delete-confirm');
                    }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </label>
                    <a href={"/products/update?id=" + product.id }
                      className="btn btn-info btn-outline btn-square btn-sm float-right">
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </a>
                  </>,
                  description: product.description,
                  categories:
                    product.categories.map(function(pCat, idx){
                      return pCat.slug + ', '
                    }),
                  categories_display: <>
                    {product.categories.map(function(pCat, idx){

                      let parentString = '';
                      if (pCat.parent) {
                        let nextCat = pCat;

                        while (nextCat != undefined) {
                          nextCat = categoryOptions.find(x => x.id == nextCat.parent);
                          if (nextCat) {
                            parentString = nextCat.title + ' > ' + parentString;
                          }
                        }
                      }

                      return <span key={idx}>
                        <a
                          className="link link-primary link-hover font-bold text-sm sm:text-md"
                          href={"/products/view/category/" + pCat.slug}>{parentString}{pCat.title}</a>
                        {(product.categories.indexOf(pCat) != (product.categories.length - 1)) && <span>,&nbsp;</span>}
                        </span>;
                    })}
                  </>,
                  image_urls: product.image_urls,
                  image_urls_display: <>
                    <div className="max-w-lg p-4 space-x-4 carousel carousel-center bg-gray-400 rounded-box">
                      {(product.image_urls.split(',').length > 0) && product.image_urls.split(',').map( (iUrl, idx) => {

                        return <div key={idx} className="carousel-item w-full items-center">
                                  <img src={iUrl} />
                                </div>;

                      })}
                    </div>
                  </>,
                  isPhysical: (product.isPhysical ? 'Yes' : 'No') + ' ' +
                    (product.stockOnHand > 0 ? product.stockOnHand + ' in Stock' : 'Out of Stock' ),
                  isPhysical_display: <div className="w-40 h-16">
                    {(product.isPhysical) && <span className="badge badge-success badge-lg sm:text-lg">Yes</span>}
                    {!(product.isPhysical) && <span className="badge badge-error badge-lg sm:text-lg">No</span>}
                    <br />
                    {(product.stockOnHand > 0) && <span
                      className={"mt-2 badge badge-lg sm:text-lg " + ((product.stockOnHand > 5) ? 'badge-success' : 'badge-warning') }>
                        {product.stockOnHand} in Stock
                      </span>}
                    {(product.stockOnHand == 0) && <span className="mt-2 badge badge-error badge-lg sm:text-lg">Out of Stock</span>}
                  </div>,
                  details_data: product.price + product.shippingWeight,
                  details_display: <div className="w-40 h-16">
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <strong>Price</strong>
                      </div>
                      <div className="col-span-1 text-right">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="col-span-2">
                        <strong>Weight</strong>
                      </div>
                      <div className="col-span-1 text-right">
                        {product.shippingWeightLBs.toFixed(1)} LBs
                      </div>
                    </div>
                  </div>,
                  createdAt: <span className="text-xs sm:text-sm">{moment(product.createdAt).fromNow()}</span>,
                  updatedAt: <span className="text-xs sm:text-sm">{moment(product.updatedAt).fromNow()}</span>,
                }
              })}
            />
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

Overview.getInitialProps = ({ query: { me, products, categoryOptions } }) => {
  return { me, products, categoryOptions };
}
