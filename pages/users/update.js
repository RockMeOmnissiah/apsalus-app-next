import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import FullNameField from '../../components/form-fields/fullNameField';
import EmailAddressField from '../../components/form-fields/emailAddressField';
import ConfirmEmailAddressField from '../../components/form-fields/confirmEmailAddressField';
import IsEmailSubscribedField from '../../components/form-fields/isEmailSubscribedField';
import IsSuperAdminField from '../../components/form-fields/isSuperAdminField';
// import PasswordField from '../../components/form-fields/passwordField';
// import ConfirmPasswordField from '../../components/form-fields/confirmPasswordField';
// import AgreeToTermsField from '../../components/form-fields/agreeToTermsField';
import SubmitButton from '../../components/form-fields/submitButton';

export default function Update({ me, userData }) {

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
      id: userData.id,
      fullName: userData.fullName,
      emailAddress: userData.emailAddress,
      confirmEmailAddress: userData.emailAddress,
      isEmailSubscribed: userData.isEmailSubscribed,
      isSuperAdmin: userData.isSuperAdmin,
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

      await fetch('/api/user/update', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/users');
        }
      });

    });
  }

  const isEmailSubscribed = watch('isEmailSubscribed');
  const isSuperAdmin = watch('isSuperAdmin');

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Update User</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Update User
          <FontAwesomeIcon className="ml-4" icon={faPencilAlt} size="xs" />
        </h1>

        <form className="w-full max-w-lg my-2" onSubmit={handleSubmit(onSubmit)}>

          <HiddenIdField register={register} errors={errors} />
          <FullNameField register={register} isSubmitting={isSubmitting} errors={errors} />
          <EmailAddressField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ConfirmEmailAddressField register={register} isSubmitting={isSubmitting} errors={errors}
            getValues={getValues}/>
          <IsEmailSubscribedField register={register} isSubmitting={isSubmitting} errors={errors}
            isEmailSubscribed={isEmailSubscribed} />
          <IsSuperAdminField register={register} isSubmitting={isSubmitting} errors={errors}
            isSuperAdmin={isSuperAdmin}/>

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Update'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

Update.getInitialProps = ({ query: { me, userData } }) => {
  return { me, userData };
}
