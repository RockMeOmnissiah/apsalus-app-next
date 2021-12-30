export default function ConfirmPasswordField({register, isSubmitting, errors, getValues}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Confirm Pass</span>
      <input
        className={"input " + (errors.confirmPassword ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="password"
        {...register(
          "confirmPassword", {
            required: true,
            validate: value =>
              value === getValues().password || false
        })}
        placeholder="**********"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.confirmPassword && <span className="text-error label-text">
    { errors.confirmPassword?.type === 'required' && "Password is required." }
    { errors.confirmPassword?.type === 'validate' && "Passwords do not match." }
  </span>}
  </>
}
