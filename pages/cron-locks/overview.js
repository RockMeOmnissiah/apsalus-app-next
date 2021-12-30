import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faStopwatch } from "@fortawesome/free-solid-svg-icons";

import DataTable from '../../components/data-table';
export default function Overview({ me, cronLocks }) {

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

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Cron Locks</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Cron Locks
          <FontAwesomeIcon className="ml-4" icon={faStopwatch} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

          <div className="pt-2">
            <DataTable
              hiddenColumns={['jobName', 'isLocked']}
              columns={[
                {
                  Header: 'JobNameData',
                  accessor: 'jobName',
                  style: { width: '0%' },
                },
                {
                  Header: 'Job',
                  accessor: 'jobName_display',
                  style: { width: '35%' },
                },
                {
                  Header: 'IsLockedData',
                  accessor: 'isLocked',
                  style: { width: '0%' },
                },
                {
                  Header: 'Is Locked?',
                  accessor: 'isLocked_display',
                  style: { width: '35%' },
                },
                {
                  Header: 'Created',
                  accessor: 'createdAt',
                  style: { width: '15%' },
                },
                {
                  Header: 'Updated',
                  accessor: 'updatedAt',
                  style: { width: '15%' },
                },
              ]}
              data={cronLocks.map(function(cronLock, idx){
                return {
                  key: {idx},
                  jobName: cronLock.jobName,
                  jobName_display: <>
                    <div className="w-full">{cronLock.id}</div>
                    <div className="w-full">{cronLock.jobName}</div>
                    <a href={"/cron-locks/update?id=" + cronLock.id }
                      className="btn btn-info btn-outline btn-square btn-sm float-right">
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </a>
                  </>,
                  isLocked: cronLock.isLocked ? 'Yes' : 'No',
                  isLocked_display: <div className="h-12">
                    {(cronLock.isLocked) && <span className="badge badge-success badge-lg sm:text-lg">Yes</span>}
                    {!(cronLock.isLocked) && <span className="badge badge-error badge-lg sm:text-lg">No</span>}
                  </div>,
                  createdAt: <span className="text-xs sm:text-sm">{moment(cronLock.createdAt).fromNow()}</span>,
                  updatedAt: <span className="text-xs sm:text-sm">{moment(cronLock.updatedAt).fromNow()}</span>,
                }
              })}
            />
          </div>

        </div>

      </main>

    </div>
  )
}

Overview.getInitialProps = ({ query: { me, cronLocks } }) => {
  return { me, cronLocks };
}
