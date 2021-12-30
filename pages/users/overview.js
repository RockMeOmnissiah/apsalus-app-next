import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../guards/is-logged-in');
// // const isSuperAdminPolicy = require('../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../guards/error';

import { useForm } from "react-hook-form";

import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../components/form-fields/hiddenIdField';
import SubmitButton from '../../components/form-fields/submitButton';

import DataTable from '../../components/data-table';
export default function Overview({ me, users }) {

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

      await fetch('/api/user/delete', {
        method: 'DELETE',
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

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Users</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Users
          <FontAwesomeIcon className="ml-4" icon={faUsers} size="xs" />
        </h1>
        <div className="w-full pt-8 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/users/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create User
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="pt-2">
            <DataTable
              hiddenColumns={['name', 'email_sub']}
              columns={[
                {
                  Header: 'NameData',
                  accessor: 'name',
                  style: { width: '0%' },
                },
                {
                  Header: 'User',
                  accessor: 'name_display',
                  style: { width: '30%' },
                },
                {
                  Header: 'Email',
                  accessor: 'email',
                  style: { width: '25%' },
                },
                {
                  Header: 'Emails?Data',
                  accessor: 'email_sub',
                  style: { width: '0%' },
                },
                {
                  Header: 'Emails?',
                  accessor: 'email_sub_display',
                  style: { width: '13%' },
                },
                {
                  Header: 'Joined',
                  accessor: 'joined',
                  style: { width: '10%' },
                },
                {
                  Header: 'Seen',
                  accessor: 'seen',
                  style: { width: '10%' },
                },
                {
                  Header: 'Actions',
                  accessor: 'actions',
                  style: { width: '12%' },
                },
              ]}
              data={users.map(function(user, idx){
                return {
                  key: {idx},
                  name: user.fullName + ' ' + user.id + (user.isSuperAdmin ? ' Super Admin' : ' User'),
                  name_display: <>
                    <div className="w-full">{user.id}</div>
                    {user.fullName}
                    {user.isSuperAdmin && <span className="badge badge-error badge-lg float-right">Super Admin</span>}
                    {!(user.isSuperAdmin) && <span className="badge badge-info badge-lg float-right">User</span>}
                  </>,
                  email: user.emailAddress,
                  email_sub: user.isEmailSubscribed ? 'Subscribed' : 'Not Subscribed',
                  email_sub_display: <>
                    {user.isEmailSubscribed && <span className="badge badge-success badge-lg">Subscribed</span>}
                    {!(user.isEmailSubscribed) && <span className="badge badge-warning badge-lg">Not Subscribed</span>}
                  </>,
                  joined: moment(user.createdAt).fromNow(),
                  seen: user.lastSeenAt > 0 ? moment(user.lastSeenAt).fromNow() : 'Never',
                  actions: <>
                    <label onClick={()=>{
                      setValue('id', user.id);
                      setActiveModal('show-delete-confirm');
                    }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </label>
                    <a href={"/users/update?id=" + user.id }
                      className="btn btn-info btn-outline btn-square btn-sm float-right">
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </a>
                  </>,
                }
              })}
            />
          </div>

        </div>

        {/* Confirm Delete Modal */}
        <input id='show-delete-confirm' className="modal-toggle" type="checkbox" />
        {(activeModal == 'show-delete-confirm') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete User?</h4>
              <div className="pb-2" />
              <p className="text-base-200 text-bold">This action cannot be undone.</p>
              <form className="w-full my-2" onSubmit={handleSubmit(onSubmit)}>

                <HiddenIdField register={register} errors={errors} />

                <div className="mt-4 modal-action">
                <label onClick={()=>{
                  setActiveModal('');
                }} htmlFor='show-delete-confirm' className="btn btn-warning btn-sm">Cancel</label>
                  <SubmitButton btnColorClass={'btn-error'} innerText={'Delete'} isSubmitting={isSubmitting} />
                </div>
              </form>
            </div>
          </div>}

      </main>

    </div>
  )
}

Overview.getInitialProps = ({ query: { me, users } }) => {
  return { me, users };
}
