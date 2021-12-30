import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function FacebookShareButton({slug}) {

  try {
    const host = window.location.host;

    return <>
      <a
        title="Share on facebook"
        href={"https://www.facebook.com/sharer/sharer.php?u=http://" + host + slug}
        target="_blank"
        rel="noopener"
        className="btn btn-info btn-outline btn-square btn-sm mr-2">
        <FontAwesomeIcon icon={faFacebook} size="lg" />
      </a>
    </>
  } catch (e) { return <></> }
}
