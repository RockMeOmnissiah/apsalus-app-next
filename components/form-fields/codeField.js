export default function CodeField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Code</span>
      <input
        className={"input " + (errors.code ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "code", {
            required: true
        })}
        placeholder="123-abc"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.code && <span className="text-error label-text">
    { errors.code?.type === 'required' && "Code is required." }
  </span>}
  </>
}
