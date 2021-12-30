import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from '../../components/form-fields/submitButton';

export default function Overview({ me }) {

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

  const { register, getValues, formState: { errors, isSubmitting }, handleSubmit } = useForm({
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

      await fetch('/api/account/resend-verify-email', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/account');
        }
      });

    });
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Account</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Account
          <FontAwesomeIcon className="ml-4" icon={faUserCircle} size="xs" />
        </h1>
        <div className="w-full lg:w-1/2 pt-8">
          <h2 className="text-left text-bold text-primary text-3xl pt-4 mb-3">
            Profile
            <a href="/account/profile" className="btn btn-primary btn-outline btn-sm float-right">
              Edit Profile
              <FontAwesomeIcon className="ml-4" icon={faPencilAlt} size="xs" />
            </a>
          </h2>
          <hr />
          <div className="text-left pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              Name:
              <strong>{me.fullName}</strong>
            </div>
          </div>
          <div className="text-left pt-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              Email:
              <strong className={((me.emailStatus === 'unconfirmed' || me.emailStatus === 'change-requested') ? 'text-base-300' : '')}>
                {me.emailChangeCandidate ? me.emailChangeCandidate : me.emailAddress}
              </strong>
            </div>

            {((me.emailStatus === 'unconfirmed') || (me.emailStatus === 'change-requested')) &&
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 pt-1 pb-4">
                <div />
                <span className="badge badge-warning badge-lg">Unverified</span>
                <span className="w-full text-right">
                  <button className="btn btn-warning btn-outline btn-sm" onClick={()=>{
                    setActiveModal('resend-verify-email');
                  }} type="button">
                    Resend Verification
                  </button>
                </span>
              </div>}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              Email Updates &amp; News:
              {me.isEmailSubscribed && <span className="badge badge-success badge-lg">Subscribed</span>}
              {!(me.isEmailSubscribed) && <span className="badge badge-warning badge-lg">Not Subscribed</span>}
            </div>
          </div>

          <h2 className="text-left text-bold text-primary text-3xl pt-12 mb-3">
            Security
            <a href="/account/password" className="btn btn-primary btn-outline btn-sm float-right">
              Edit Security
              <FontAwesomeIcon className="ml-4" icon={faPencilAlt} size="xs" />
            </a>
          </h2>
          <hr />
          <div className="text-left pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              Password:
              <strong className="ml-4">••••••••••</strong>
            </div>
          </div>
        </div>

        {/* Confirm Resend Verification Email Modal */}
        <input id="resend-verify-email" className="modal-toggle" type="checkbox" />
        {(activeModal == 'resend-verify-email') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Resend Verification Email?</h4>
              <div className="pb-2" />
              <p>Resend verification email to <strong>{ me.emailAddress }</strong>?</p>
              <form className="w-full my-2" onSubmit={handleSubmit(onSubmit)}>

                <div className="mt-4 modal-action">
                <label onClick={()=>{
                  setActiveModal('');
                }} htmlFor="resend-verify-email" className="btn btn-warning btn-sm">Cancel</label>
                  <SubmitButton btnColorClass={'btn-primary'} innerText={'Submit'} isSubmitting={isSubmitting} />
                </div>
              </form>
            </div>
          </div>}

        {/* Success Resend Verification Email Modal */}
        <input id="success-resend-verify-email" className="modal-toggle" type="checkbox" />
        {(activeModal == 'success-resend-verify-email') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Verification Email Resent</h4>
              <div className="pb-2" />
              <p>Verification email resent to <strong>{ me.emailAddress }</strong></p>
              <div className="modal-action">
                <label onClick={()=>{
                  setActiveModal('');
                }} htmlFor="success-resend-verify-email" className="btn btn-primary btn-sm">OK</label>
              </div>
            </div>
          </div>}

      </main>

    </div>
  )
}

Overview.getInitialProps = ({ query: { me } }) => {
  return { me };
}
