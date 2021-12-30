export default function ShipToEstDateField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Order Est.</span>
        <input
          className={"input " + (errors.shipToEstDate ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "shipToEstDate", {
              required: false
          })}
          placeholder="2022-01-01"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.shipToEstDate && <span className="text-error label-text">
      { errors.shipToEstDate?.type === 'required' && "Order Est. is required." }
    </span>}
  </>
}
