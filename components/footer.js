import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFingerprint, faGavel, faRobot, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Footer({me}) {

  return <>
    <footer style={{zIndex: 999}} className="footer fixed bottom-0">
      <div className="bg-base-300 text-base-content w-full p-0">
        <div tabIndex="0" className="collapse collapse-arrow w-full p-0">
          <input type="checkbox" />
          <div className="collapse-title rounded-lg">
            <div className="flex flex-row mx-auto lg:w-full lg:justify-start p-1 rounded-lg bg-base-300">
              <span className="text-xs sm:text-sm lg:text-lg mr-1 lg:mr-2">Copyright © {new Date().getFullYear()}</span>
              <span className="text-xs sm:text-sm lg:text-lg">All rights reserved</span>
              <span className="text-xs sm:text-sm lg:text-lg ml-auto mr-1 lg:mr-2">Apsalus Technologies, LLC</span>
            </div>
          </div>
          <div className="collapse-content rounded-lg mx-auto w-auto" style={{padding: '0'}}>
            <div className="lg:flex lg:flex-row mx-auto grid grid-cols-2 lg:w-full lg:justify-end rounded-lg p-4 bg-base-300">
              <span className="mr-2 md:mr-4">
                <a href='/about' className="link link-primary link-hover font-bold text-sm lg:text-lg">
                  <FontAwesomeIcon className="mr-1" icon={faRobot} />
                  About
                </a>
              </span>
              <span className="mr-2 md:mr-4">
                <a href='/legal/terms' className="link link-primary link-hover font-bold text-sm lg:text-lg">
                  <FontAwesomeIcon className="mr-1" icon={faGavel} />
                  Terms
                </a>
              </span>
              <span className="mr-2 md:mr-4">
                <a href='/legal/privacy' className="link link-primary link-hover font-bold text-sm lg:text-lg">
                  <FontAwesomeIcon className="mr-1" icon={faFingerprint} />
                  Privacy
                </a>
              </span>
              <span className="mr-2 md:mr-4">
                <a href='/contact' className="link link-primary link-hover font-bold text-sm lg:text-lg">
                  <FontAwesomeIcon className="mr-1" icon={faEnvelope} />
                  Contact Us
                </a>
              </span>
              {me && // logged in?
                <span className="mr-2 md:mr-4">
                  <a href='/api/account/logout' className="link link-primary link-hover font-bold text-sm lg:text-lg">
                    <FontAwesomeIcon className="mr-1" icon={faSignOutAlt} />
                    Logout
                  </a>
                </span>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}
