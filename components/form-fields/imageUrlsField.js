export default function ImageUrlsField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Image URLs</span>
      <textarea
        className={"h-20 input " + (errors.image_urls ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}

        {...register(
          "image_urls", {
            required: true
        })}
        placeholder="http://www.server.com/myImage.png,http://www.server.com/myImage.png"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.image_urls && <span className="text-error label-text">
    { errors.image_urls?.type === 'required' && "Image URLs is required." }
  </span>}
  </>
}
