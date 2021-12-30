import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faPercent, faTrash } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';

import DataTable from '../../components/data-table';
export default function Overview({ me, promoCodes }) {

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

      await fetch('/api/promo-code/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/promo-codes');
        }
      });

    });
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Promo Codes</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Promo Codes
          <FontAwesomeIcon className="ml-4" icon={faPercent} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/promo-codes/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create Promo Code
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="pt-2">
            <DataTable
              hiddenColumns={['code']}
              columns={[
                {
                  Header: 'CodeData',
                  accessor: 'code',
                  style: { width: '0%' },
                },
                {
                  Header: 'Code',
                  accessor: 'code_display',
                  style: { width: '35%' },
                },
                {
                  Header: 'Discount',
                  accessor: 'discount_percent',
                  style: { width: '35%' },
                },
                {
                  Header: 'Created',
                  accessor: 'createdAt',
                  style: { width: '15%' },
                },
                {
                  Header: 'Updated',
                  accessor: 'updatedAt',
                  style: { width: '15%' },
                },
              ]}
              data={promoCodes.map(function(promo, idx){
                return {
                  key: {idx},
                  code: promo.code,
                  code_display: <>
                    {promo.code}
                    <label onClick={()=>{
                      setValue('id', promo.id);
                      setActiveModal('show-delete-confirm');
                    }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </label>
                    <a href={"/promo-codes/update?id=" + promo.id }
                      className="btn btn-info btn-outline btn-square btn-sm float-right">
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </a>
                  </>,
                  discount_percent: (promo.discount_percent * 100) + '%',
                  createdAt: <span className="text-xs sm:text-sm">{moment(promo.createdAt).fromNow()}</span>,
                  updatedAt: <span className="text-xs sm:text-sm">{moment(promo.updatedAt).fromNow()}</span>,
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
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete Promo Code?</h4>
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

Overview.getInitialProps = ({ query: { me, promoCodes } }) => {
  return { me, promoCodes };
}
