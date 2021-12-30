export default function ItemizedField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Itemized</span>
        <input
          className={"input " + (errors.itemized ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "itemized", {
              required: true
          })}
          placeholder="1x This, 1x That"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.itemized && <span className="text-error label-text">
      { errors.itemized?.type === 'required' && "Itemized is required." }
    </span>}
  </>
}
