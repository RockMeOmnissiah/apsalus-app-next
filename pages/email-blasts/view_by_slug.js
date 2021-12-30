import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPencilAlt, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';

import moment from 'moment';

export default function ViewBySlug({ me, emBlast }) {

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
        <title>{emBlast.title}</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          {emBlast.title}
          <FontAwesomeIcon className="ml-4" icon={faEnvelope} size="xs" />
        </h1>
        <hr className="bg-neutral text-neutral-content" />
        <div className="w-full pt-8 bg-neutral text-neutral-content">

          <div className="bg-neutral text-neutral-content">
            <div className="mb-4">
              <div className="w-full sm:w-auto text-sm md:text-lg float-left text-secondary sm:ml-2">
                {emBlast.user.fullName}
              </div>

              {(emBlast.scheduledFor > 0) && <span className="badge badge-success badge-lg bg-accent text-neutral-content">Scheduled&nbsp;{moment(emBlast.scheduledFor).fromNow()}</span>}
              {(emBlast.scheduledFor == 0) && <span className="badge badge-warning badge-lg">Not Scheduled</span>}

              <div className="w-full sm:w-auto text-sm md:text-lg float-right sm:mr-4 text-secondary">
              {moment(emBlast.createdAt).fromNow()}
              </div>
            </div>

            {me && me.isSuperAdmin && <div className="pt-2 mb-10">
              <a href="/email-blasts/create" className="btn btn-primary btn-outline btn-sm ml-2 mr-2 float-right">
                Create Email Blast
                <FontAwesomeIcon className="ml-2" icon={faPlus} />
              </a>
              <label onClick={()=>{
                setValue('id', emBlast.id);
                setActiveModal('show-delete-confirm');
              }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </label>
              <a href={"/email-blasts/update?id=" + emBlast.id }
                className="btn btn-info btn-outline btn-square btn-sm float-right">
                <FontAwesomeIcon icon={faPencilAlt} size="lg" />
              </a>
              </div>}

            <hr />
          </div>

          <h5 className="pt-8 pb-4 px-4 text-left bg-base-300 text-base-content">
            <span dangerouslySetInnerHTML={{ __html: emBlast.content }} ></span>
          </h5>

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

ViewBySlug.getInitialProps = ({ query: { me, emBlast } }) => {
  return { me, emBlast };
}
