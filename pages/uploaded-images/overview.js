import Head from 'next/head';

// import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
// import { useRouter } from 'next/router';

// import { Guard_ReactSailsAPIErrors } from '../../guards/error';

// import { useForm } from "react-hook-form";

// import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import DataTable from '../../components/data-table';
export default function Overview({ me, images }) {

  // const [ authorized, setAuthorized ] = useState(null);
  // const router = useRouter();
  // useEffect(() => {
  //   async function checkGuards() {

  //     if (await isLoggedInPolicy.Guard_ReactPage(me, router)) {
  //       setAuthorized(true);
  //     }
  //   }
  //   checkGuards();
  // }, []);
  // if (!authorized) { return (null); }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Uploaded Images</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Uploaded Images
          <FontAwesomeIcon className="ml-4" icon={faImages} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

        <p className="text-red-400 text-bold mx-auto"><i>Unused images will be automatically removed periodically.</i></p>

          <div className="pt-2">
            <DataTable
              hiddenColumns={['link']}
              columns={[
                {
                  Header: 'ID',
                  accessor: 'id',
                  style: { width: '15%' },
                },
                {
                  Header: 'LinkData',
                  accessor: 'link',
                  style: { width: '0%' },
                },
                {
                  Header: 'Link',
                  accessor: 'link_display',
                  style: { width: '40%' },
                },
                {
                  Header: 'Preview',
                  accessor: 'preview',
                  style: { width: '45%' },
                },
              ]}
              data={images.map(function(image, idx){
                return {
                  key: {idx},
                  id: image._id,
                  link: '/api/images/download/' + image._id,
                  link_display: <>
                    <a
                      className="link link-primary link-hover"
                      href={'/api/images/download/' + image._id}>
                      {'/api/images/download/' + image._id}
                    </a>
                  </>,
                  preview: <>
                    <img src={'/api/images/download/' + image._id} />
                  </>,
                }
              })}
            />
          </div>

        </div>

      </main>

    </div>
  )
}

Overview.getInitialProps = ({ query: { me, images } }) => {
  return { me, images };
}
