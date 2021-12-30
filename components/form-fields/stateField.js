export default function StateField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">State</span>
      <input
        autoComplete='address-level1'
        className={"input " + (errors.admin_area_1 ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "admin_area_1", {
            required: true
        })}
        placeholder="IL"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.admin_area_1 && <span className="text-error label-text">
    { errors.admin_area_1?.type === 'required' && "State is required." }
  </span>}
  </>
}
