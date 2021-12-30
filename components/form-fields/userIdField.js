export default function UserIdField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">User ID</span>
        <input
          className={"input " + (errors.user_id ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "user_id", {
              required: true
          })}
          placeholder="ID"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.user_id && <span className="text-error label-text">
      { errors.user_id?.type === 'required' && "User ID is required." }
    </span>}
  </>
}
