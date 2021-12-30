export default function Address1Field({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Address 1</span>
      <input
        autoComplete='address-line1'
        className={"input " + (errors.address_line_1 ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "address_line_1", {
            required: true
        })}
        placeholder="123 Main St"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.address_line_1 && <span className="text-error label-text">
    { errors.address_line_1?.type === 'required' && "Address 1 is required." }
  </span>}
  </>
}
