export default function ShippingCarrierField({register, isSubmitting, errors}) {

  let carrierOptionElements = (
    [
      {
        id: 'usps',
        title: 'USPS'
      },
      {
        id: 'fedex',
        title: 'FedEx'
      },
      {
        id: 'ups',
        title: 'UPS'
      },
    ].map(function(carrierOp, idx){
      return <option key={idx} value={carrierOp.id}>{carrierOp.title}</option>
    })
  );

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 w-32 text-xs sm:text-sm">Ship Carrier</span>
      <select
        className={"select " + (errors.shippingCarrier ? 'select-error' : 'select-primary') + " select-bordered select-sm flex-1"}
        type="json"
        {...register(
          "shippingCarrier", {
            required: false
        })}
        disabled={isSubmitting}
      >
        {carrierOptionElements}
      </select>
    </label>
  </div>
  {/* { errors.shippingCarrier && <span className="text-error label-text">
    { errors.shippingCarrier?.type === 'required' && "Status is required." }
  </span>} */}
  </>
}
