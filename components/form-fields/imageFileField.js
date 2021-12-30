import { useRouter } from 'next/router';
import { Guard_ReactSailsAPIErrors } from "../../guards/error";

export default function ImageFileField({isSubmitting, getValues, setValue}) {

  const router = useRouter();

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Images</span>
      <input
        type="file"
        accept="image/*"
        multiple
        className={"input input-primary input-bordered input-sm flex-1"}
        onChange={async (e)=>{

          await fetch('/api/csrfToken', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          }).then( async(response) => {

            let csrfJson = await response.json();
            let image_urls_array = (getValues().image_urls ? getValues().image_urls.split(',') : []);
            for (let i = 0; i < e.target.files.length; i++) {

              const data = new FormData();
              data.append('_csrf', csrfJson._csrf)
              data.append('image', e.target.files[i]);

              await fetch('/api/images/upload', {
                method: 'POST',
                credentials: 'include',
                body: data,
              }).then( async (response) => {
                if( Guard_ReactSailsAPIErrors(router, response) ) {
                  const responseJson = await response.json();
                  image_urls_array.push('/' + responseJson.data.filePath);
                  setValue('image_urls', image_urls_array.join(','));
                }
              });
            }
          });
        }}
        disabled={isSubmitting}
      />
    </label>
  </div>
  </>
}
