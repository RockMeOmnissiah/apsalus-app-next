import Head from 'next/head';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function FAQ({ me }) {

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>FAQ</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          FAQ
          <FontAwesomeIcon className="ml-4" icon={faQuestionCircle} size="xs" />
        </h1>
        <div className="w-full lg:w-1/2 pt-8">

          <div className="collapse border rounded-box border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              I open/close with click
            </div>
            <div className="collapse-content">
              <p>Collapse content reveals with focus. If you add a checkbox, you can control it using checkbox instead of focus. Or you can force-open/force-close using
                <span className="badge badge-outline">collapse-open</span> and
                <span className="badge badge-outline">collapse-close</span> classes.
              </p>
            </div>
          </div>

        </div>
      </main>

    </div>
  )
}

FAQ.getInitialProps = ({ query: { me } }) => {
  return { me };
}
