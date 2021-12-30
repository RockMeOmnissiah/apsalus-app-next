import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import HomeBtn from '../../components/home-btn';
import { Guard_ReactSailsAPIErrors } from '../../guards/error';
export default function EmailConfirm({ me, token }) {

  const router = useRouter();

  useEffect(() => {

    async function callAPI() {
      await fetch('/api/csrfToken', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then( async(response) => {

        let data = {};
        data._csrf = (await response.json())._csrf;
        data.token = token;

        await fetch('/api/entrance/email/confirm', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then( async (response) => {
          if( Guard_ReactSailsAPIErrors(router, response) ) {
            // router.push('/');
          }
        });

      });
    }
    callAPI();
  },
  []);

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Email Confirmed</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold bg-primary text-secondary rounded-lg w-full">
          Congratulations, your account is now verified! You now have full access to your account.
        </h1>
        <div className="pt-4" />
        <HomeBtn />
      </main>

    </div>
  </>
}

EmailConfirm.getInitialProps = ({ query: { me, token } }) => {
  return { me, token };
}
