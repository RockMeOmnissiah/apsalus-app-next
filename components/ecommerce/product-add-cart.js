import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck, faFrown, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProductAddCart({me, router, item, cartItems, onAdd}) {

  let inCart = cartItems.find(x => x.id == item.id);

  let soldOut = (
    <button className="btn btn-sm md:btn-lg text-xs md:text-lg btn-warning btn-outline btn-disabled"
      disabled={true} type="button" >
      Out of Stock
      <FontAwesomeIcon className="ml-2" icon={faFrown} />
    </button>
  );

  return <>
    {!me && <div
      className={"justify-center border rounded-lg p-4 " + ((item.stockOnHand > 0) ? 'bg-base-200' : 'bg-neutral' )}>
      <label className="input-group justify-center text-xs sm:text-md mb-4">
       <span className="label-text text-bold text-lg sm:text-2xl bg-success text-accent-content">
          $
        </span>
        <span className="label-text text-bold text-lg sm:text-2xl bg-accent text-accent-content">
          {item.price.toFixed(2)}
        </span>
      </label>
      {(item.stockOnHand <= 0) && <div className="mb-2">
        {soldOut}
      </div>}
      {(item.stockOnHand > 0) && <>
        <label className="input-group text-xs sm:text-md">
          <a href={'/login?referer=' + router.asPath}
            className="btn btn-primary btn-outline btn-xs sm:btn-sm text-xs sm:text-sm font-bold rounded-lg">
            Login
            <FontAwesomeIcon className="ml-2" icon={faSignInAlt} />
          </a>
          <span className="rounded-lg btn-xs sm:btn-sm mx-2">or</span>
          <a href={'/signup?referer=' + router.asPath}
            className="btn btn-success btn-outline btn-xs sm:btn-sm text-xs sm:text-sm font-bold rounded-lg">
            Sign Up
            <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
          </a>
        </label>
        <div className="mx-auto text-sm sm:text-md pt-2">to purchase.</div>
      </>}
    </div>}
    {me && <div className="justify-center">
      <label className="input-group w-full">

        <span className="label-text text-bold text-lg sm:text-2xl bg-accent text-accent-content">$ {item.price.toFixed(2)}</span>

        {(item.stockOnHand <= 0) && <>
          {soldOut}
        </>}
        {(item.stockOnHand > 0) && <>
          {inCart && <div> {/* needs to start with 'div' instead of <> to be unique from alternate element (otherwise React gets confused) */}

            <button className="btn btn-sm md:btn-lg text-xs md:text-lg btn-success btn-outline btn-disabled" disabled={true} type="button" >
              In Cart
              <FontAwesomeIcon className="ml-2" icon={faCheck} />
            </button>

            </div>}
          {!inCart && <>

            <button className="btn btn-sm md:btn-lg text-xs md:text-lg btn-success btn-outline" onClick={() => onAdd(item)} type="button" >
              Add to Cart
              <FontAwesomeIcon className="ml-2" icon={faCartPlus} />
            </button>

            </>}
        </>}
      </label>
      </div>}
  </>;
}
