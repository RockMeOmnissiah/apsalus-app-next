export default function ShippingWeightField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Weight(LBs)</span>
        <input
          className={"input " + (errors.shippingWeightLBs ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="number"
          {...register(
            "shippingWeightLBs", {
              required: true
          })}
          placeholder="0.1"
          disabled={isSubmitting}
          min={0}
          max={70}
          step={0.01}
        />
      </label>
    </div>
    { errors.shippingWeightLBs && <span className="text-error label-text">
      { errors.shippingWeightLBs?.type === 'required' && "Weight is required." }
    </span>}
  </>
}
