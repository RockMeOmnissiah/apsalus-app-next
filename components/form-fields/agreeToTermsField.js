export default function AgreeToTermsField({register, isSubmitting, errors, agreed}) {
  return <>
    <div className={"card bordered mb-1 mt-4 " +
    (agreed ? 'bg-accent' : 'bg-base-200') }>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text ml-2 text-xs sm:text-sm">
            I have read &amp; agree to the
            <a target="_blank" href="/terms" className="link link-neutral ml-1">terms of service</a>
            .
          </span>
          <input
            className={"toggle " + (errors.agreed ? 'toggle-error' : 'toggle-accent') + " toggle-bordered toggle-sm"}
            type="checkbox"
            {...register(
              "agreed", {
                validate:
                  v => v == true || false
            })}
            disabled={isSubmitting}
          />
        </label>
      </div>
    </div>
    { errors.agreed && <span className="text-error label-text">
      { errors.agreed?.type === 'validate' && "Agree to Terms is required." }
    </span>}
  </>
}
