export default function DiscountPercentField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Discount</span>
        <input
          className={"input " + (errors.discount_percent ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="number"
          {...register(
            "discount_percent", {
              required: true
          })}
          placeholder="0.10"
          disabled={isSubmitting}
          min={0}
          max={0.75}
          step={0.01}
        />
      </label>
    </div>
    { errors.discount_percent && <span className="text-error label-text">
      { errors.discount_percent?.type === 'required' && "Discount is required." }
    </span>}
  </>
}
