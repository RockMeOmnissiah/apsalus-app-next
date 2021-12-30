export default function DiscountPriceField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Discount</span>
        <input
          className={"input " + (errors.discountPrice ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="number"
          {...register(
            "discountPrice", {
              required: true
          })}
          placeholder="-4.99"
          disabled={isSubmitting}
          min={-999}
          max={0}
          step={0.01}
        />
      </label>
    </div>
    { errors.discountPrice && <span className="text-error label-text">
      { errors.discountPrice?.type === 'required' && "Discount is required." }
    </span>}
  </>
}
