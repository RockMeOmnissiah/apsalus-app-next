import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SubmitButton({isSubmitting, btnColorClass, innerText}) {
  return <>
    <button
      className={"btn " + btnColorClass + " btn-outline btn-sm py-2 px-4 rounded-lg"}
      type="submit"
      disabled={isSubmitting}>
        {innerText}
        {isSubmitting && <FontAwesomeIcon className="animate-spin ml-2" icon={faSpinner} />}
    </button>
  </>
}
