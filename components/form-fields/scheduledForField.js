export default function ScheduledForField({register, isSubmitting, errors, minDate, maxDate}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Scheduled For</span>
      <input
        className={"input " + (errors.scheduledFor ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="datetime-local"
        {...register(
          "scheduledFor", {
            required: false
        })}
        min={minDate}
        max={maxDate}
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.scheduledFor && <span className="text-error label-text">
    { errors.scheduledFor?.type === 'required' && "Scheduled For is required." }
  </span>}
  </>
}
