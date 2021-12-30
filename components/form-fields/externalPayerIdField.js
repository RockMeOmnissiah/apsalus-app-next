export default function ExternalPayerIdField({register, isSubmitting, errors}) {
  return <>
    <div className="form-control w-full mb-1 mt-4">
      <label className="input-group w-full">
        <span className="label-text flex-0 w-32 text-xs sm:text-sm">Ext. Payer ID</span>
        <input
          className={"input " + (errors.external_payer_id ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
          type="text"
          {...register(
            "external_payer_id", {
              required: true
          })}
          placeholder="ID"
          disabled={isSubmitting}
        />
      </label>
    </div>
    { errors.external_payer_id && <span className="text-error label-text">
      { errors.external_payer_id?.type === 'required' && "Ext. Payer ID is required." }
    </span>}
  </>
}
