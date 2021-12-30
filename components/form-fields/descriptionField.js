export default function DescriptionField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Description</span>
      <textarea
        className={"input " + (errors.description ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}

        {...register(
          "description", {
            required: true
        })}
        placeholder="Description"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.description && <span className="text-error label-text">
    { errors.description?.type === 'required' && "Description is required." }
  </span>}
  </>
}
