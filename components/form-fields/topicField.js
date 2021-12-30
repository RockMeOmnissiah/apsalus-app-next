export default function TopicField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Topic</span>
      <input
        className={"input " + (errors.topic ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        {...register(
          "topic", {
            required: true
        })}
        placeholder="Topic"
        disabled={isSubmitting}
      />
    </label>
  </div>
  { errors.topic && <span className="text-error label-text">
    { errors.topic?.type === 'required' && "Topic is required." }
  </span>}
  </>
}
