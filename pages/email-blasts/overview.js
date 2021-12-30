import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faEnvelope, faTrash } from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';

import DataTable from '../../components/data-table';

export default function Overview({ me, emBlasts }) {

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

      await fetch('/api/email-blasts/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/email-blasts');
        }
      });

    });
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Email Blasts</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Email Blasts
          <FontAwesomeIcon className="ml-4" icon={faEnvelope} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/email-blasts/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create Email Blast
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="pt-2">
            <DataTable
              hiddenColumns={['title', 'scheduled']}
              columns={[
                {
                  Header: 'TitleData',
                  accessor: 'title',
                  style: { width: '0%' },
                },
                {
                  Header: 'Title',
                  accessor: 'title_display',
                  style: { width: '45%' },
                },
                {
                  Header: 'Author',
                  accessor: 'author',
                  style: { width: '20%' },
                },
                {
                  Header: 'Created',
                  accessor: 'created',
                  style: { width: '15%' },
                },
                {
                  Header: 'ScheduledData',
                  accessor: 'scheduled',
                  style: { width: '0%' },
                },
                {
                  Header: 'Scheduled',
                  accessor: 'scheduled_display',
                  style: { width: '20%' },
                },
              ]}
              data={emBlasts.map(function(em, idx){
                return {
                  key: {idx},
                  title: em.title,
                  title_display: <>
                    <a href={"/email-blasts/view/" + em.slug }
                      className="link link-primary link-hover font-bold text-lg sm:text-xl">
                      {em.title}
                    </a>

                    {me && me.isSuperAdmin && <>
                      <label onClick={()=>{
                        setValue('id', em.id);
                        setActiveModal('show-delete-confirm');
                      }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </label>
                      <a href={"/email-blasts/update?id=" + em.id }
                        className="btn btn-info btn-outline btn-square btn-sm float-right">
                        <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                      </a>
                      </>}
                  </>,
                  author: em.user.fullName,
                  created: moment(em.createdAt).fromNow(),
                  scheduled: (em.scheduledFor > 0 ? 'Scheduled ' + moment(em.scheduledFor).fromNow() : 'Not Scheduled'),
                  scheduled_display: <>
                    {(em.scheduledFor > 0) && <span className="badge badge-success badge-lg">Scheduled&nbsp;{moment(em.scheduledFor).fromNow()}</span>}
                    {(em.scheduledFor == 0) && <span className="badge badge-warning badge-lg">Not Scheduled</span>}
                  </>,
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
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete Email Blast?</h4>
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

Overview.getInitialProps = ({ query: { me, emBlasts } }) => {
  return { me, emBlasts };
}
