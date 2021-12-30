export default function ConfirmEmailAddressField({register, isSubmitting, errors, getValues}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Confirm Email</span>
      <input
        className={"input " + (errors.confirm_email ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "confirm_email", {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            validate: value =>
              value === getValues().emailAddress || false
        })}
        placeholder="email@example.com"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.confirm_email && <span className="text-error label-text">
    { errors.confirm_email?.type === 'required' && "Email is required." }
    { errors.confirm_email?.type === 'pattern' && "Email is invalid." }
    { errors.confirm_email?.type === 'validate' && "Emails do not match." }
  </span>}
  </>
}
