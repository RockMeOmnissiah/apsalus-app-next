export default function CountryCodeField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Country</span>
        <input
          autoComplete='country-code'
          className={"input " + (errors.country_code ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "country_code", {
              required: true
          })}
          placeholder="US"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.country_code && <span className="text-error label-text">
      { errors.country_code?.type === 'required' && "Country is required." }
    </span>}
  </>
}
