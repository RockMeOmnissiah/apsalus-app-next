export default function EmailAddressField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Email</span>
      <input
        autoComplete='email'
        className={"input " + (errors.emailAddress ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "emailAddress", {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        })}
        placeholder="email@example.com"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.emailAddress && <span className="text-error label-text">
    { errors.emailAddress?.type === 'required' && "Email is required." }
    { errors.emailAddress?.type === 'pattern' && "Email is invalid." }
  </span>}
  </>
}
