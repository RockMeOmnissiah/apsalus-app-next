import Head from 'next/head';

import { useEffect, useState } from 'react';
// const isLoggedInPolicy = require('../../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlus, faNewspaper, faTrash } from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';
import HiddenIdField from '../../../components/form-fields/hiddenIdField';
import SubmitButton from '../../../components/form-fields/submitButton';
import FacebookShareButton from '../../../components/social-media/facebook-share-btn';
import TwitterShareButton from '../../../components/social-media/twitter-share-btn';

export default function Recent({ me, posts, categoryOptions }) {

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

      await fetch('/api/blog/post/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.push('/blog/posts');
        }
      });

    });
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Recent Blog Posts</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Recent Blog Posts
          <FontAwesomeIcon className="ml-4" icon={faNewspaper} size="xs" />
        </h1>
        <div className="w-full pt-4 mt-4">

        {me && me.isSuperAdmin &&
          <a href="/blog/posts/create" className="btn btn-primary btn-outline btn-sm float-right">
            Create Blog Post
            <FontAwesomeIcon className="ml-2" icon={faPlus} />
          </a>}

          <div className="pt-10">

            {posts.map(function(p, idx){
              return <div key={idx} className="card lg:card-side bordered shadow bg-neutral text-neutral-content mb-16">
                        <div className="card-body">
                          <h1 className="card-title text-2xl sm:text-4xl font-bold bg-primary rounded-lg">
                            <a href={"/blog/posts/view/" + p.slug }
                              className="link link-hover font-bold">
                              {p.title}
                            </a>
                          </h1>
                          <h4 className="mb-2">
                            <div className="w-full sm:w-auto text-sm md:text-lg float-left text-secondary">{p.user.fullName}</div>

                            {p.categories.map(function(pCat, idx){

                              let parentString = '';
                              if (pCat.parent) {
                                let nextCat = pCat;

                                while (nextCat != undefined) {
                                  nextCat = categoryOptions.find(x => x.id == nextCat.parent);
                                  if (nextCat) {
                                    parentString = nextCat.title + ' > ' + parentString;
                                  }
                                }
                              }

                              return <span key={idx}>
                                <a
                                  className="link link-primary link-hover font-bold text-sm sm:text-md"
                                  href={"/blog/posts/view/category/" + pCat.slug}>{parentString}{pCat.title}</a>
                                {(p.categories.indexOf(pCat) != (p.categories.length - 1)) && <span>,&nbsp;</span>}
                                </span>;
                              })}

                            <div className="w-full sm:w-auto text-sm md:text-lg float-right">
                              <span className="sm:mr-4 text-secondary">{moment(p.createdAt).fromNow()}</span>
                              {me && me.isSuperAdmin && <>
                                <a href={"/blog/posts/update?id=" + p.id }
                                  className="btn btn-info btn-outline btn-square btn-sm mr-2">
                                  <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                                </a>
                                <label onClick={()=>{
                                  setValue('id', p.id);
                                  setActiveModal('show-delete-confirm');
                                }} className="btn btn-error btn-outline btn-square btn-sm">
                                  <FontAwesomeIcon icon={faTrash} size="lg" />
                                </label>
                                </>}
                              </div>
                          </h4>
                          <hr />
                          <span
                            className="text-left mt-8 px-4"
                            style={{
                              height: '15em', lineHeight:'1.25em', overflow: 'hidden',
                              WebkitMaskImage: "linear-gradient(180deg, #fff, transparent)" }}
                            dangerouslySetInnerHTML={{ __html: p.content }}>
                          </span>
                          <div className="card-actions">
                            <a href={"/blog/posts/view/" + p.slug }
                              className="link link-accent link-hover font-bold text-sm sm:text-lg">
                              Read more...
                            </a>
                            <span className="mx-auto text-sm sm:text-lg">
                              Comments&nbsp;({p.comments.length})
                            </span>

                            <span className="float-right">
                              <FacebookShareButton slug={'/blog/posts/view/' + p.slug} />
                              <TwitterShareButton slug={'/blog/posts/view/' + p.slug} />
                            </span>
                          </div>
                        </div>
                      </div>
            })}

          </div>

        </div>

        {/* Confirm Delete Modal */}
        <input id='show-delete-confirm' className="modal-toggle" type="checkbox" />
        {(activeModal == 'show-delete-confirm') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete Blog Post?</h4>
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

Recent.getInitialProps = ({ query: { me, posts, categoryOptions } }) => {
  return { me, posts, categoryOptions };
}
