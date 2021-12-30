export default function StockOnHandField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Stock On Hand</span>
        <input
          className={"input " + (errors.stockOnHand ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="number"
          {...register(
            "stockOnHand", {
              required: true
          })}
          placeholder="5"
          disabled={isSubmitting}
          min={0}
          max={999}
          step={1}
        />
      </label>
    </div>
    { errors.stockOnHand && <span className="text-error label-text">
      { errors.stockOnHand?.type === 'required' && "Stock On Hand is required." }
    </span>}
  </>
}
