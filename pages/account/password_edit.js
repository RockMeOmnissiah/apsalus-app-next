import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import PasswordField from '../../components/form-fields/passwordField';
import ConfirmPasswordField from '../../components/form-fields/confirmPasswordField';
import SubmitButton from '../../components/form-fields/submitButton';

export default function PasswordEdit({ me }) {

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

      await fetch('/api/account/update-password', {
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

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Edit Password</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
        Edit Password
          <FontAwesomeIcon className="ml-4" icon={faLockOpen} size="xs" />
        </h1>

        <form className="w-full max-w-sm my-2" onSubmit={handleSubmit(onSubmit)}>

          <PasswordField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ConfirmPasswordField register={register} isSubmitting={isSubmitting} errors={errors}
            getValues={getValues} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Submit'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

PasswordEdit.getInitialProps = ({ query: { me } }) => {
  return { me };
}
