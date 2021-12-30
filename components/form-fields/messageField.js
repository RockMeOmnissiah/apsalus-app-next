export default function MessageField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Message</span>
      <textarea
        className={"input " + (errors.message ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}

        {...register(
          "message", {
            required: true
        })}
        placeholder="Message"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.message && <span className="text-error label-text">
    { errors.message?.type === 'required' && "Message is required." }
  </span>}
  </>
}
