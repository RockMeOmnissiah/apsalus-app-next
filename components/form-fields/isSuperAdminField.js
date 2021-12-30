export default function IsSuperAdminField({register, isSubmitting, errors, isSuperAdmin}) {
  return <>
    <div className={"card bordered mb-1 mt-4 " +
    (isSuperAdmin ? 'bg-accent' : 'bg-base-200') }>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text ml-2 text-xs sm:text-sm">Grant Super Admin Power?</span>
          <input
            className={"toggle " + (errors.isSuperAdmin ? 'toggle-error' : 'toggle-accent') + " toggle-bordered toggle-sm"}
            type="checkbox"
            {...register(
              "isSuperAdmin", {
            })}
            disabled={isSubmitting}
          />
        </label>
      </div>
    </div>
  </>
}
