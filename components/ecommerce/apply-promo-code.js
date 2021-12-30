import { useState } from "react"

export default function ApplyPromoCode({promoCodes, showInput, subtotal, setDiscountPercent}) {

  const [ userPromo, setUserPromo ] = useState("");
  const [ promoErrors, setPromoErrors ] = useState({});

  return <>
    <div className="form-control w-full mb-1 mt-4">
    <label className="input-group w-full">
      <input
        className={"input text-base-content " + (promoErrors.code ? 'input-error' : 'input-primary') + " input-bordered input-sm flex-1"}
        type="text"
        onChange={(e)=>{
          setPromoErrors({});
          setUserPromo(e.target.value);
        }}
        placeholder="Promo Code"
        disabled={!showInput}
      />
      <button
        className="btn btn-sm btn-primary btn-outline"
        disabled={!showInput}
        onClick={()=>{
          const found = promoCodes.find(x => x.code == userPromo);
          if (found) {
            setDiscountPercent(found.discount_percent);
          } else {
            setDiscountPercent(0);
            if (userPromo) {
              setPromoErrors({
                code: {
                  type: 'invalid'
                }
              });
            }
          }
        }}
      >
        Apply Promo
      </button>
    </label>
  </div>
  { promoErrors.code && <span className="text-error label-text">
    { promoErrors.code?.type === 'invalid' && "Promo code is invalid." }
  </span>}
  </>
}
