export default function OrderStatusField({register, isSubmitting, errors}) {

  let statusOptionElements = (
    [
      {
        id: 'pending',
        title: 'Pending'
      },
      {
        id: 'received',
        title: 'Received'
      },
      {
        id: 'fulfilled',
        title: 'Fulfilled'
      },
      {
        id: 'refunded',
        title: 'Refunded'
      }
    ].map(function(statusOp, idx){
      return <option key={idx} value={statusOp.id}>{statusOp.title}</option>
    })
  );

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Status</span>
      <select
        className={"select " + (errors.status ? 'select-error' : 'select-primary') + " select-bordered select-sm flex-1"}
        type="json"
        {...register(
          "status", {
            required: true
        })}
        disabled={isSubmitting}
      >
        {statusOptionElements}
      </select>
    </label>
  </div>
  { errors.status && <span className="text-error label-text">
    { errors.status?.type === 'required' && "Status is required." }
  </span>}
  </>
}
