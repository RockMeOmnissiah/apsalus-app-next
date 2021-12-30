import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faReceipt, faTrash } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';

import DataTable from '../../components/data-table';
export default function Orders({ me, orders }) {

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

      await fetch('/api/order/delete', {
        method: 'DELETE',
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

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>My Orders</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          My Orders
          <FontAwesomeIcon className="ml-4" icon={faReceipt} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/orders/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create Order
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="pt-2">
            <DataTable
              hiddenColumns={['external_order_id', 'status', 'shipTo', 'totalPrice']}
              columns={[
                {
                  Header: 'OrderData',
                  accessor: 'external_order_id',
                  style: { width: '0%' },
                },
                {
                  Header: 'Order',
                  accessor: 'external_order_id_display',
                  style: { width: '20%' },
                },
                {
                  Header: 'Items',
                  accessor: 'itemized',
                  style: { width: '16%' },
                },
                {
                  Header: 'ShipData',
                  accessor: 'shipTo',
                  style: { width: '0%' },
                },
                {
                  Header: 'Ship To',
                  accessor: 'shipTo_display',
                  style: { width: '14%' },
                },
                {
                  Header: 'TotalData',
                  accessor: 'totalPrice',
                  style: { width: '0%' },
                },
                {
                  Header: 'Total',
                  accessor: 'totalPrice_display',
                  style: { width: '14%' },
                },
                {
                  Header: 'StatusData',
                  accessor: 'status',
                  style: { width: '0%' },
                },
                {
                  Header: 'Status',
                  accessor: 'status_display',
                  style: { width: '12%' },
                },
                {
                  Header: 'Created',
                  accessor: 'createdAt',
                  style: { width: '12%' },
                },
                {
                  Header: 'Updated',
                  accessor: 'updatedAt',
                  style: { width: '12%' },
                },
              ]}
              data={orders.map(function(order, idx){
                return {
                  key: {idx},
                  external_order_id: order.external_order_id,
                  external_order_id_display: <>
                    <span className="text-sm sm:text-md">{order.external_order_id}</span>
                    <label onClick={()=>{
                      setValue('id', order.id);
                      setActiveModal('show-delete-confirm');
                    }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </label>
                    <a href={"/orders/update?id=" + order.id }
                      className="btn btn-info btn-outline btn-square btn-sm float-right">
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </a>
                  </>,
                  itemized: <span className="text-sm sm:text-md">{order.itemized}</span>,
                  shipTo: order.shipToFullName + ' ' + order.shipToAddress1 + ' ' + order.shipToAddress2 +
                    ' ' + order.shipToCity + ' ' + order.shipToState + ' ' + order.shipToZip + ' ' +
                    order.shipToCountry + ' ' + order.shipToEstDate,
                  shipTo_display: <div className="w-36">
                    <div className="grid grid-cols-3 text-xs sm:text-sm">
                      <div className="col-span-3">{order.shipToFullName}</div>
                      <div className="col-span-3">{order.shipToAddress1}</div>
                      <div className="col-span-3">{order.shipToAddress2}</div>
                      <div className="col-span-3">{order.shipToCity}</div>
                      <div className="col-span-3">{order.shipToState}</div>
                      <div className="col-span-3">{order.shipToZip}</div>
                      <div className="col-span-3">{order.shipToCountry}</div>
                    </div>
                    {order.shipToEstDate && <div className="grid grid-cols-3 text-gray-300 text-xs sm:text-sm">
                      <div className="col-span-1">Order Est.</div>
                      <div className="col-span-2 text-right">{order.shipToEstDate}</div>
                    </div>}
                    {(order.shippingWeightLBs > 0) && <div className="grid grid-cols-3 text-gray-300 text-xs sm:text-sm">
                      <div className="col-span-1">Weight</div>
                      <div className="col-span-2 text-right">{order.shippingWeightLBs.toFixed(1)} LBs</div>
                    </div>}
                  </div>,
                  totalPrice: order.totalPrice,
                  totalPrice_display: <div className="w-36">
                    <div className="grid grid-cols-3 text-gray-300 text-xs sm:text-sm">
                      <div className="col-span-2">Subtotal</div>
                      <div className="col-span-1 text-right">${order.subtotal.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 text-gray-300 text-xs sm:text-sm">
                      <div className="col-span-2">Tax</div>
                      <div className="col-span-1 text-right">${order.taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-3 text-gray-300 text-xs sm:text-sm">
                      <div className="col-span-2">Shipping</div>
                      <div className="col-span-1 text-right">
                        ${order.shippingPrice.toFixed(2)}
                      </div>
                    </div>
                    {(order.discountPrice != 0) && <>
                      <div className="grid grid-cols-3 text-red-300 text-xs sm:text-sm">
                        <div className="col-span-2">Discount</div>
                        <div className="col-span-1 text-right">${order.discountPrice.toFixed(2)}</div>
                      </div>
                    </>}

                    <div className="grid grid-cols-3 text-sm sm:text-md">
                      <div className="col-span-2">
                        <strong>Total</strong>
                      </div>
                      <div className="col-span-1 text-right">
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>,
                  status: order.status,
                  status_display: <div className="h-18">
                    {(order.status == 'pending') && <span className="badge badge-info badge-lg sm:text-lg">Pending</span>}
                    {(order.status == 'received') && <span className="badge badge-info badge-lg sm:text-lg">Received</span>}
                    {(order.status == 'fulfilled') && <>
                      <span className="badge badge-success badge-lg sm:text-lg">Fulfilled</span>
                      {order.shippingTracking && <>
                        <div className="w-full pt-2">{order.shippingCarrier.toUpperCase()}</div>
                        <div className="w-full">{
                          order.shippingCarrier == 'usps' ?
                            <a className="link link-hover link-primary"
                              href={'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=' + order.shippingTracking}>
                              #{order.shippingTracking}
                            </a>
                          :
                            <span>#{order.shippingTracking}</span>
                        }</div>
                      </>}
                    </>}
                    {(order.status == 'refunded') && <span className="badge badge-error badge-lg sm:text-lg">Refunded</span>}
                  </div>,
                  createdAt: <span className="text-xs sm:text-sm">{moment(order.createdAt).fromNow()}</span>,
                  updatedAt: <span className="text-xs sm:text-sm">{moment(order.updatedAt).fromNow()}</span>,
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
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete Order?</h4>
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

Orders.getInitialProps = ({ query: { me, orders } }) => {
  return { me, orders };
}
