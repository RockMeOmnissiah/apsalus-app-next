import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function TwitterShareButton({slug}) {

  try {
    const host = window.location.host;

    return <>
      <a
        title="Share on twitter"
        href={"https://twitter.com/intent/tweet?url=http://" + host + slug}
        target="_blank"
        rel="noopener"
        className="btn btn-info btn-outline btn-square btn-sm mr-2">
        <FontAwesomeIcon icon={faTwitter} size="lg" />
      </a>
    </>
  } catch (e) { return <></> }
}
