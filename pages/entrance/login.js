import Head from 'next/head';
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import EmailAddressField from '../../components/form-fields/emailAddressField';
import PasswordField from '../../components/form-fields/passwordField';
import SubmitButton from '../../components/form-fields/submitButton';

export default function Login({ me, referer }) {

  const router = useRouter();

  const { register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm({
    defaultValues: {
      // emailAddress: 'test@example.com',
      // password: 'test',
      rememberMe: true
    }
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

      await fetch('/api/entrance/login', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push((referer ? referer : '/'));
          if (referer == undefined || referer == '/') { router.reload(); }
        }
      });

    // });
  }

  const rememberMe = watch('rememberMe');

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Login</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Login
          <FontAwesomeIcon className="ml-4" icon={faSignInAlt} size="xs" />
        </h1>

        <form className="w-full max-w-sm my-2" onSubmit={handleSubmit(onSubmit)}>

          <EmailAddressField register={register} isSubmitting={isSubmitting} errors={errors} />
          <PasswordField register={register} isSubmitting={isSubmitting} errors={errors} />

          <div className={"card bordered mb-1 mt-4 " +
          (rememberMe ? 'bg-accent' : 'bg-base-200') }>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text ml-2 text-xs sm:text-sm">Remember me</span>
                <input
                  className={"toggle " + (errors.rememberMe ? 'toggle-error' : 'toggle-accent') + " toggle-bordered toggle-sm"}
                  type="checkbox"
                  {...register(
                    "rememberMe", {
                  })}
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Login'} isSubmitting={isSubmitting} />
          </div>
        </form>

        <div>
          <a href='/password/forgot' className="link link-primary link-hover">Forgot password?</a>
        </div>

      </main>

    </div>
  </>
}

Login.getInitialProps = ({ query: { me, referer } }) => {
  return { me, referer };
}
