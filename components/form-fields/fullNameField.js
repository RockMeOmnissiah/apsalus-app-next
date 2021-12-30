export default function FullNameField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Full Name</span>
      <input
        autoComplete='name'
        className={"input " + (errors.fullName ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "fullName", {
            required: true
        })}
        placeholder="Your Name Here"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.fullName && <span className="text-error label-text">
    { errors.fullName?.type === 'required' && "Full Name is required." }
  </span>}
  </>
}
