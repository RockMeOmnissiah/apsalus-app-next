export default function IsPhysicalField({register, isSubmitting, errors, isPhysical}) {
  return <>
    <div className={"card bordered mb-1 mt-4 " +
    (isPhysical ? 'bg-accent' : 'bg-base-200') }>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text ml-2 text-xs sm:text-sm">Is Physical?</span>
          <input
            className={"toggle " + (errors.isPhysical ? 'toggle-error' : 'toggle-accent') + " toggle-bordered toggle-sm"}
            type="checkbox"
            {...register(
              "isPhysical", {
            })}
            disabled={isSubmitting}
          />
        </label>
      </div>
      { errors.isPhysical && <span className="text-error label-text">
      { errors.isPhysical?.type === 'validate' && "Is Physical? is required." }
    </span>}
    </div>
  </>
}
