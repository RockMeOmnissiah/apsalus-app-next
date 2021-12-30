export default function Address2Field({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Address 2</span>
      <input
        autoComplete='address-line2'
        className={"input " + (errors.address_line_2 ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "address_line_2", {
            required: false
        })}
        placeholder="Apt 3A"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.address_line_2 && <span className="text-error label-text">
    { errors.address_line_2?.type === 'required' && "Address 2 is required." }
  </span>}
  </>
}
