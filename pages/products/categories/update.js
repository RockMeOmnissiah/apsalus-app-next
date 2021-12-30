import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../../components/form-fields/hiddenIdField';
import TitleField from '../../../components/form-fields/titleField';
import DescriptionField from '../../../components/form-fields/descriptionField';
import SubmitButton from '../../../components/form-fields/submitButton';
import ParentCategoryField from '../../../components/form-fields/parentCategoryField';

export default function Update({ me, catData, categoryOptions }) {

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
    defaultValues: {
      id: catData.id,
      title: catData.title,
      description: catData.description,
      parent: catData.parent,
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

      await fetch('/api/product/category/update', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/products/categories');
        }
      });

    });
  }

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Update Category</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Update Category
          <FontAwesomeIcon className="ml-4" icon={faPencilAlt} size="xs" />
        </h1>

        <form className="w-full max-w-lg my-2" onSubmit={handleSubmit(onSubmit)}>

          <HiddenIdField register={register} errors={errors} />
          <TitleField register={register} isSubmitting={isSubmitting} errors={errors} />
          <DescriptionField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ParentCategoryField register={register} isSubmitting={isSubmitting} errors={errors}
            categoryOptions={categoryOptions} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Update'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

Update.getInitialProps = ({ query: { me, catData, categoryOptions } }) => {
  return { me, catData, categoryOptions };
}
