export default function IsEmailSubscribedField({register, isSubmitting, errors, isEmailSubscribed}) {
  return <>
    <div className={"card bordered mb-1 mt-4 " +
    (isEmailSubscribed ? 'bg-accent' : 'bg-base-200') }>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text ml-2 text-xs sm:text-sm">Receive email news &amp; updates?</span>
          <input
            className={"toggle " + (errors.isEmailSubscribed ? 'toggle-error' : 'toggle-accent') + " toggle-bordered toggle-sm"}
            type="checkbox"
            {...register(
              "isEmailSubscribed", {
            })}
            disabled={isSubmitting}
          />
        </label>
      </div>
    </div>
  </>
}
