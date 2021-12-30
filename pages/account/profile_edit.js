import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import EmailAddressField from '../../components/form-fields/emailAddressField';
import ConfirmEmailAddressField from '../../components/form-fields/confirmEmailAddressField';
import FullNameField from '../../components/form-fields/fullNameField';
import IsEmailSubscribedField from '../../components/form-fields/isEmailSubscribedField';
import SubmitButton from '../../components/form-fields/submitButton';

export default function ProfileEdit({ me }) {

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

  const { register, getValues, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: me.fullName,
      emailAddress: me.emailAddress,
      confirm_email: me.emailAddress,
      isEmailSubscribed: me.isEmailSubscribed,
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

      await fetch('/api/account/update-profile', {
        method: 'PUT',
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

  const isEmailSubscribed = watch('isEmailSubscribed');

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Edit Profile</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
        Edit Profile
          <FontAwesomeIcon className="ml-4" icon={faUserEdit} size="xs" />
        </h1>

        <form className="w-full max-w-sm my-2" onSubmit={handleSubmit(onSubmit)}>

          <FullNameField register={register} isSubmitting={isSubmitting} errors={errors} />
          <EmailAddressField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ConfirmEmailAddressField register={register} isSubmitting={isSubmitting} errors={errors}
            getValues={getValues} />
          <IsEmailSubscribedField register={register} isSubmitting={isSubmitting} errors={errors}
            isEmailSubscribed={isEmailSubscribed} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Submit'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

ProfileEdit.getInitialProps = ({ query: { me } }) => {
  return { me };
}
