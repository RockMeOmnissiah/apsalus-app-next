export default function ShipToFullNameField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Ship Name</span>
      <input
        className={"input " + (errors.shipToFullName ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "shipToFullName", {
            required: true
        })}
        placeholder="Ship To Name Here"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.shipToFullName && <span className="text-error label-text">
    { errors.shipToFullName?.type === 'required' && "Ship Name is required." }
  </span>}
  </>
}
