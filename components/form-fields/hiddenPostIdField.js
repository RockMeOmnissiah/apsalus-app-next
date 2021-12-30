export default function HiddenIdField({register, errors}) {
  return <>
    <input
      className="input"
      type="hidden"
      {...register(
        "post_id", {
          required: true,
      })}
    />
    { errors.post_id && <span className="text-error label-text">
      { errors.post_id?.type === 'required' && "Post ID is required." }
    </span>}
  </>;
}
