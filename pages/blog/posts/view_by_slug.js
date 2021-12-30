import Head from 'next/head';

import { useCallback, useMemo, useState } from 'react';
// const isLoggedInPolicy = require('../../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faPencilAlt, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import HiddenIdField from '../../../components/form-fields/hiddenIdField';
import HiddenPostIdField from '../../../components/form-fields/hiddenPostIdField';
import ContentField from '../../../components/form-fields/contentField';
import SubmitButton from '../../../components/form-fields/submitButton';

import moment from 'moment';
import FacebookShareButton from '../../../components/social-media/facebook-share-btn';
import TwitterShareButton from '../../../components/social-media/twitter-share-btn';

export default function ViewBySlug({ me, post, categoryOptions }) {

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

  // POST + COMMENT DELETE FORMS
  const { register, getValues, setValue, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    defaultValues: {}
  });
  // ADD COMMENT FORM
  const { register: registerComment, getValues: getValuesComment, setValue: setValueComment,
    formState: { errors: errorsComment, isSubmitting: isSubmittingComment }, handleSubmit: handleSubmitComment } = useForm({

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

  const onSubmitDeleteComment = async (data) => {
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

      await fetch('/api/blog/comment/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.reload();
        }
      });

    });
  }

  const onSubmitCreateComment = async (data) => {
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

      await fetch('/api/blog/comment/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then( async (response) => {
        if( Guard_ReactSailsAPIErrors(router, response) ) {
          router.reload();
        }
      });

    });
  }

  const onChange = useCallback((value) => {
    setValueComment("content", value);
  }, []);
  const commentOptions = useMemo(() => {
    let MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
    return {
      toolbar: [
        "bold", "italic", "heading", "strikethrough", "|",
        "quote", "code", "horizontal-rule", "|",
        "link", "image", "table", "|",
        "preview", "side-by-side", "fullscreen", "|",
        "guide"
      ],
      previewRender(v) {
        return md.render(v);
      },
      uploadImage: false,
      // imageUploadEndpoint: '/api/images/upload'
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          {post.title}
          <FontAwesomeIcon className="ml-4" icon={faNewspaper} size="xs" />
        </h1>
        <hr className="bg-neutral text-neutral-content" />
        <div className="w-full pt-8 bg-neutral text-neutral-content">

          <div className="bg-neutral text-neutral-content">
            <div className="mb-4">
              <div className="w-full sm:w-auto text-sm md:text-lg float-left text-secondary sm:ml-2">
                {post.user.fullName}
              </div>

              {post.categories.map(function(pCat, idx){

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
                  {(post.categories.indexOf(pCat) != (post.categories.length - 1)) && <span>,&nbsp;</span>}
                </span>;
              })}

              <div className="w-full sm:w-auto text-sm md:text-lg sm:float-right">
                <span className="inline-block sm:inline text-secondary sm:mr-4">{moment(post.createdAt).fromNow()}</span>
                <span className="w-full mt-2 sm: mt-0 sm:w-auto inline-block sm:inline">
                  <FacebookShareButton slug={'/blog/posts/view/' + post.slug} />
                  <TwitterShareButton slug={'/blog/posts/view/' + post.slug} />
                </span>
              </div>
            </div>


            {me && me.isSuperAdmin && <div className="pt-2 mb-10">
              <a href="/blog/posts/create" className="btn btn-primary btn-outline btn-sm ml-2 mr-2 float-right">
                Create Blog Post
                <FontAwesomeIcon className="ml-2" icon={faPlus} />
              </a>
              <label onClick={()=>{
                setValue('id', post.id);
                setActiveModal('show-delete-confirm');
              }} className="btn btn-error btn-outline btn-square btn-sm ml-2 float-right">
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </label>
              <a href={"/blog/posts/update?id=" + post.id }
                className="btn btn-info btn-outline btn-square btn-sm float-right">
                <FontAwesomeIcon icon={faPencilAlt} size="lg" />
              </a>
              </div>}

            <hr />
          </div>
          <h5 className="pt-8 pb-4 px-4 text-left bg-base-300 text-base-content">
            <span dangerouslySetInnerHTML={{ __html: post.content }} ></span>
          </h5>

          {/* COMMENTS */}
          <div className="bg-base-200 text-base-content pt-8">

            {post.comments.map(function(pCom, idx){
              return <div key={idx} className="card lg:card-side max-w-4xl mx-auto bordered bg-neutral text-neutral-content mb-8">
                <div className="card-body">
                  <h4 className="mb-2">
                    <span className="text-sm md:text-lg float-left text-secondary">{pCom.user.fullName}</span>
                    {(me && ((me.isSuperAdmin) || (me.id == pCom.user.id))) && <>
                    <label onClick={()=>{
                      setValue('id', pCom.id);
                      setActiveModal('show-delete-comment-confirm');
                    }} className="btn btn-error btn-outline btn-square btn-sm float-right">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </label>
                    </>}
                    <span className="mr-4 text-sm md:text-lg float-right text-secondary">{moment(pCom.createdAt).fromNow()}</span>
                  </h4>
                  <hr />
                  <span className="pt-4" dangerouslySetInnerHTML={{ __html: pCom.content }} />
                </div>
              </div>})}

            {!me && <div className="pt-4">
              <span span className="mr-1">Please</span>
              <a href='/signup' className="link link-primary link-hover">signup</a>
              <span span className="mx-1">or</span>
              <a href={'/login?referer=/blog/posts/view/' + post.slug} className="link link-primary link-hover">login</a>
              <span span className="ml-1">to comment.</span>
            </div>}
            {me && <div className="collapse border mx-auto max-w-4xl rounded-box border-base-300 collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-bold text-success">
                Add Comment
              </div>
              <div className="collapse-content" onClick={()=>{
                  setValueComment('post_id', post.id);
                }}>
                <form className="mx-auto max-w-4xl py-2" onSubmit={handleSubmitComment(onSubmitCreateComment)}>

                  <HiddenPostIdField register={registerComment} errors={errorsComment} />
                  <ContentField register={registerComment} isSubmitting={isSubmittingComment} errors={errorsComment}
                    options={commentOptions} onChange={onChange} getValues={getValuesComment} />

                  <div className="pt-2">
                    <SubmitButton btnColorClass={'btn-success'} innerText={'Add Comment'} isSubmitting={isSubmittingComment} />
                  </div>
                </form>
              </div>
            </div>}

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

        {/* Confirm Delete Comment Modal */}
        <input id='show-delete-comment-confirm' className="modal-toggle" type="checkbox" />
        {(activeModal == 'show-delete-comment-confirm') &&
          <div className="modal modal-open">
            <div className="modal-box bg-neutral text-neutral-content">
              <h4 className="font-bold bg-primary text-xl pb-2 rounded-lg">Delete Comment?</h4>
              <p className="text-base-200 text-bold">This action cannot be undone.</p>
              <form className="w-full my-2" onSubmit={handleSubmit(onSubmitDeleteComment)}>

                <HiddenIdField register={register} errors={errors} />

                <div className="mt-4 modal-action">
                <label onClick={()=>{
                  setActiveModal('');
                }} htmlFor='show-delete-comment-confirm' className="btn btn-warning btn-sm">Cancel</label>
                  <SubmitButton btnColorClass={'btn-error'} innerText={'Delete'} isSubmitting={isSubmitting} />
                </div>
              </form>
            </div>
          </div>}

      </main>

    </div>
  )
}

ViewBySlug.getInitialProps = ({ query: { me, post, categoryOptions } }) => {
  return { me, post, categoryOptions };
}
