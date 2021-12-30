export default function CityField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">City</span>
      <input
        autoComplete='address-level2'
        className={"input " + (errors.admin_area_2 ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "admin_area_2", {
            required: true
        })}
        placeholder="Townsville"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.admin_area_2 && <span className="text-error label-text">
    { errors.admin_area_2?.type === 'required' && "City is required." }
  </span>}
  </>
}
