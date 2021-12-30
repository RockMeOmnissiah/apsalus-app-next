export default function IsLockedField({register, isSubmitting, errors, isLocked}) {
  return <>
    <div className={"card bordered mb-1 mt-4 " +
    (isLocked ? 'bg-accent' : 'bg-base-200') }>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text ml-2 text-xs sm:text-sm">Is Locked?</span>
          <input
            className={"toggle " + (errors.isLocked ? 'toggle-error' : 'toggle-accent') + " toggle-bordered toggle-sm"}
            type="checkbox"
            {...register(
              "isLocked", {
            })}
            disabled={isSubmitting}
          />
        </label>
      </div>
      { errors.isLocked && <span className="text-error label-text">
      { errors.isLocked?.type === 'validate' && "Is Locked? is required." }
    </span>}
    </div>
  </>
}
