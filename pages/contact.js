import Head from 'next/head';
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../guards/error';

import { useState } from 'react';
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import EmailAddressField from '../components/form-fields/emailAddressField';
import FullNameField from '../components/form-fields/fullNameField';
import TopicField from '../components/form-fields/topicField';
import MessageField from '../components/form-fields/messageField';
import SubmitButton from '../components/form-fields/submitButton';

export default function Contact({ me }) {

  const router = useRouter();

  const [ activeModal, setActiveModal ] = useState(null);

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

    // await fetch('/api/csrfToken', {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // }).then( async(response) => {

    //   data._csrf = (await response.json())._csrf;

      await fetch('/api/deliver-contact-form-message', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          setActiveModal('show-sent-confirm');
        }
      });

    // });
  }

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Contact Us</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Contact Us
          <FontAwesomeIcon className="ml-4" icon={faEnvelope} size="xs" />
        </h1>

        <div className="pt-2">Need to get in touch? Drop us a line.</div>

        <form className="w-full max-w-lg my-2" onSubmit={handleSubmit(onSubmit)}>

          <EmailAddressField register={register} isSubmitting={isSubmitting} errors={errors} />
          <FullNameField register={register} isSubmitting={isSubmitting} errors={errors} />
          <TopicField register={register} isSubmitting={isSubmitting} errors={errors} />
          <MessageField register={register} isSubmitting={isSubmitting} errors={errors} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Send'} isSubmitting={isSubmitting} />
          </div>
        </form>

        <div className="pt-2">Thanks for reaching out! &hearts;</div>

      </main>

      {/* Confirm Sent Modal */}
      <input id='show-sent-confirm' className="modal-toggle" type="checkbox" />
        {(activeModal == 'show-sent-confirm') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pl-4 pb-2 rounded-lg">Message Sent</h4>
              <div className="pb-2" />
              <p className="text-base-200 text-bold">Your message has been sent.</p>
              <div className="mt-4 modal-action">
                <label onClick={()=>{
                  router.push('/');
                }} htmlFor='show-sent-confirm' className="btn btn-primary btn-outline btn-sm">Ok</label>
              </div>
            </div>
          </div>}

    </div>
  </>
}

Contact.getInitialProps = ({ query: { me } }) => {
  return { me };
}
