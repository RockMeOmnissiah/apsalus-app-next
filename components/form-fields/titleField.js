export default function TitleField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Title</span>
        <input
          className={"input " + (errors.title ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "title", {
              required: true
          })}
          placeholder="Title"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.title && <span className="text-error label-text">
      { errors.title?.type === 'required' && "Title is required." }
    </span>}
  </>
}
