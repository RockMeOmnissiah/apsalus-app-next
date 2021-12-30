export default function PostalCodeField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Zip Code</span>
      <input
        autoComplete='postal-code'
        className={"input " + (errors.postal_code ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "postal_code", {
            required: true
        })}
        placeholder="12345"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.postal_code && <span className="text-error label-text">
    { errors.postal_code?.type === 'required' && "Zip Code is required." }
  </span>}
  </>
}
