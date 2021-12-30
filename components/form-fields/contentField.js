import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

export default function ContentField({register, isSubmitting, errors, options, onChange, getValues}) {

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full overflow-auto">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Content</span>

      <SimpleMDE
        {...register(
          "content", {
            required: true
        })}
        className="w-full"
        value={getValues().content}
        options={options}
        onChange={onChange}
        disabled={isSubmitting}
      />

    </label>
  </div>
  { errors.content && <span className="text-error label-text">
    { errors.content?.type === 'required' && "Content is required." }
  </span>}
  </>
}
