export default function PasswordField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Password</span>
      <input
        autoComplete='password'
        className={"input " + (errors.password ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="password"
        {...register(
          "password", {
            required: true,
        })}
        placeholder="**********"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.password && <span className="text-error label-text">
    { errors.password?.type === 'required' && "Password is required." }
  </span>}
  </>
}
