export default function ShipToCountryCodeField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Ship Country</span>
        <input
          className={"input " + (errors.shipToCountry ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "shipToCountry", {
              required: true
          })}
          placeholder="US"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.shipToCountry && <span className="text-error label-text">
      { errors.shipToCountry?.type === 'required' && "Ship Country is required." }
    </span>}
  </>
}
