export default function HiddenIdField({register, errors}) {
  return <>
    <input
      className="input"
      type="hidden"
      {...register(
        "id", {
          required: true,
      })}
    />
    { errors.id && <span className="text-error label-text">
      { errors.id?.type === 'required' && "ID is required." }
    </span>}
  </>
}
