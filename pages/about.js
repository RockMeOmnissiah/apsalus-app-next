import Head from 'next/head';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export default function About({ me }) {

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>About Us</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          About Us
          <FontAwesomeIcon className="ml-4" icon={faRobot} size="xs" />
        </h1>

        <div className="mt-8 text-left">
          <p>
            <span>At apsalus-tech.com, accessible from apsalus-tech.com, </span>
            <span>one of our main priorities is the privacy of our visitors. </span>
            <span>This Privacy Policy document contains types of information that is collected </span>
            <span>and recorded by apsalus-tech.com and how we use it. </span>
            <span>If you have additional questions or require more information about our Privacy Policy, </span>
            <span>do not hesitate to <a className="link link-primary link-hover" href="/contact">contact us</a>.</span>
          </p>

          <p className="pt-2">
            <span>This Privacy Policy applies only to our online activities and is valid for visitors to our website </span>
            <span>with regards to the information that they shared and/or collect at apsalus-tech.com. </span>
            <span>This policy is not applicable to any information collected offline or via channels other than this website. </span>
          </p>

          <h2 className="py-4">How we use your information</h2>

          <p>
            <span>We use the information we collect in various ways, including to:</span>
          </p>
          <ul className="list-disc pl-4 pt-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              <span>Communicate with you, either directly or through one of our partners, </span>
              <span>including for customer service, to provide you with updates and other information relating to the website, </span>
              <span>and for marketing and promotional purposes</span>
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

        </div>

      </main>

    </div>
  )
}

About.getInitialProps = ({ query: { me } }) => {
  return { me };
}
