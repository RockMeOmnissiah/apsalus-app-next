export default function ShippingOptionsField({shippingOptions, isDisabled, setShippingEstDate, setPhysicalShippingCost}) {

  let shipOptionElements = (
    shippingOptions.map(function(shipOp, idx){
      return <option
                key={idx}
                value={shipOp.rate}
              >
                ${shipOp.rate} (USPS Est. {shipOp.commitmentDate})
              </option>
    })
  );

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <span className="label-text flex-0 text-xs sm:text-sm">Shipping</span>
      <select
        className="select select-primary select-bordered select-sm text-base-content flex-1"
        type="json"
        onChange={e => {
          let entry = shippingOptions.find(x => x.rate == e.target.value);
          setShippingEstDate(entry.commitmentDate);
          setPhysicalShippingCost(parseFloat(entry.rate));
        }}
        disabled={isDisabled}
      >
        {shipOptionElements}
      </select>
    </label>
  </div>
  </>
}
