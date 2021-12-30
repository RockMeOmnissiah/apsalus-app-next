export default function PriceField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Price</span>
        <input
          className={"input " + (errors.price ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="number"
          {...register(
            "price", {
              required: true
          })}
          placeholder="4.99"
          disabled={isSubmitting}
          min={0}
          max={999}
          step={0.01}
        />
      </label>
    </div>
    { errors.price && <span className="text-error label-text">
      { errors.price?.type === 'required' && "Price is required." }
    </span>}
  </>
}
