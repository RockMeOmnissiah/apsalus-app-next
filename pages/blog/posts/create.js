import Head from 'next/head';

import { useCallback, useMemo } from 'react';
// const isLoggedInPolicy = require('../../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');
import { useRouter } from 'next/router';

import { Guard_ReactSailsAPIErrors } from '../../../guards/error';

import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import TitleField from '../../../components/form-fields/titleField';
import ContentField from '../../../components/form-fields/contentField';
import SubmitButton from '../../../components/form-fields/submitButton';
import CategoriesField from '../../../components/form-fields/categoriesField';

export default function Create({ me, categoryOptions }) {

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

  const { register, getValues, setValue, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    defaultValues: {
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

      await fetch('/api/blog/post/create', {
        method: 'POST',
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

  const onChange = useCallback((value) => {
    setValue("content", value);
  }, []);
  const mdeOptions = useMemo(() => {
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
      uploadImage: true,
      imageUploadEndpoint: '/api/images/upload'
    };
  }, []);

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Create Blog Post</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Create Blog Post
          <FontAwesomeIcon className="ml-4" icon={faNewspaper} size="xs" />
        </h1>

        <form className="w-full max-w-4xl my-2" onSubmit={handleSubmit(onSubmit)}>

          <TitleField register={register} isSubmitting={isSubmitting} errors={errors} />
          <ContentField register={register} isSubmitting={isSubmitting} errors={errors}
            options={mdeOptions} onChange={onChange} getValues={getValues} />
          <CategoriesField register={register} isSubmitting={isSubmitting} errors={errors}
            categoryOptions={categoryOptions} />

          <div className="mt-4">
            <SubmitButton btnColorClass={'btn-primary'} innerText={'Create'} isSubmitting={isSubmitting} />
          </div>
        </form>

      </main>

    </div>
  </>
}

Create.getInitialProps = ({ query: { me, categoryOptions } }) => {
  return { me, categoryOptions };
}
