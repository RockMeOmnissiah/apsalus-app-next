import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

export default function Banner({bannerText}) {
  return (
    <div className="alert alert-info w-full text-sm sm:text-lg">
      <div className="mx-auto">
        <FontAwesomeIcon className="mr-4" icon={faShoppingBasket} size="lg" />
        <label>{bannerText}</label>
      </div>
    </div>
  )
}
