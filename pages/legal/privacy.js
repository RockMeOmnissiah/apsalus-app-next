import Head from 'next/head';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

export default function Privacy({ me }) {

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Privacy Policy</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Privacy Policy
          <FontAwesomeIcon className="ml-4" icon={faFingerprint} size="xs" />
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

          <h2 className="py-4">Consent</h2>

          <p>
            <span>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</span>
          </p>

          <h2 className="py-4">Information we collect</h2>

          <p>
            <span>The personal information that you are asked to provide, and the reasons why you are asked to provide it, </span>
            <span>will be made clear to you at the point we ask you to provide your personal information. </span>
            <span>If you <a className="link link-primary link-hover" href="/contact">contact us</a> directly, we may receive additional information about you such as your name, </span>
            <span>email address, mailing address, the contents of the message and/or attachments you may send us, </span>
            <span>and any other information you may choose to provide. </span>
            <span>When you register for an Account, we may ask for your contact information, </span>
            <span>including items such as name, and email address.</span>
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

          <h2 className="py-4">Log Files</h2>

          <p>
            <span>apsalus-tech.com follows a standard procedure of using log files. </span>
            <span>These files log visitors when they visit websites. </span>
            <span>All hosting companies do this and a part of hosting services' analytics. </span>
            <span>The information collected by log files include internet protocol (IP) addresses, browser type, </span>
            <span>Internet Service Provider (ISP), date and time stamp, referring/exit pages, </span>
            <span>and possibly the number of clicks. These are not linked to any information that is personally identifiable. </span>
            <span>The purpose of the information is for analyzing trends, administering the site, </span>
            <span>tracking users' movement on the website, and gathering demographic information.</span>
          </p>

          <h2 className="py-4">Cookies and Web Beacons</h2>

          <p>
            <span>Like many other websites, apsalus-tech.com uses 'cookies'. </span>
            <span>These cookies are used to store information including visitors' preferences, </span>
            <span>and the pages on the website that the visitor accessed or visited. </span>
            <span>The information is used to optimize the users' experience by customizing our web page </span>
            <span>content based on visitors' browser type and/or other information.</span>
          </p>

          <p className="pt-2">
            <span>For more general information on cookies, </span>
            <span>please read the <a className="link link-primary link-hover" href="https://www.generateprivacypolicy.com/#cookies">cookies article</a> </span>
            <span>on the Generate Privacy Policy website.</span>
          </p>



          <h2 className="py-4">Advertising Partners Privacy Policies</h2>

          <p>
            <span>You may consult this list to find the Privacy Policy for each of the advertising partners of apsalus-tech.com.</span>
            <span>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, </span>
            <span>or Web Beacons that are used in their respective advertisements and links that appear on apsalus-tech.com, </span>
            <span>which are sent directly to users' browser. They automatically receive your IP address when this occurs. </span>
            <span>These technologies are used to measure the effectiveness of their advertising campaigns </span>
            <span>and/or to personalize the advertising content that you see on websites that you visit.</span>
          </p>

          <p className="pt-2">
            <span>We do not currently use advertising partners.</span>
          </p>

          <p className="pt-2">
            <span>Note that apsalus-tech.com has no access to or control over these cookies that are used by third-party advertisers.</span>
          </p>

          <h2 className="py-4">Third Party Privacy Policies</h2>

          <p>
            <span>apsalus-tech.com's Privacy Policy does not apply to other advertisers or websites. </span>
            <span>Thus, we are advising you to consult the respective Privacy Policies of these third-party </span>
            <span>servers for more detailed information. It may include their practices and instructions about </span>
            <span>how to opt-out of certain options. You can choose to disable cookies through </span>
            <span>your individual browser options. To know more detailed information </span>
            <span>about cookie management with specific web browsers, it can be found at the browsers' respective websites.</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li><a className="link link-primary link-hover" href="https://api.sendgrid.com/privacy.html">SendGrid Privacy Policy</a></li>
            <li><a className="link link-primary link-hover" href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full">PayPal Privacy Policy</a></li>
          </ul>

          <h2 className="py-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

          <p>
            <span>Under the CCPA, among other rights, California consumers have the right to:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>
              <span>Request that a business that collects a consumer's personal data disclose the categories </span>
              <span>and specific pieces of personal data that a business has collected about consumers.</span>
            </li>
            <li>
              <span>Request that a business delete any personal data about the consumer that a business has collected.</span>
            </li>
            <li>
              <span>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</span>
            </li>
            <li>
              <span>If you make a request, we have one month to respond to you. </span>
              <span>If you would like to exercise any of these rights, please <a className="link link-primary link-hover" href="/contact">contact us</a>.</span>
            </li>
          </ul>

          <h2 className="py-4">GDPR Data Protection Rights</h2>

          <p>
            <span>We would like to make sure you are fully aware of all of your data protection rights. </span>
            <span>Every user is entitled to the following:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>
              <span>The right to access – </span>
              <span>You have the right to request copies of your personal data. We may charge you a small fee for this service.</span>
            </li>
            <li>
              <span>The right to rectification – </span>
              <span>You have the right to request that we correct any information you believe is inaccurate. </span>
              <span>You also have the right to request that we complete the information you believe is incomplete.</span>
            </li>
            <li>
              <span>The right to erasure – </span>
              <span>You have the right to request that we erase your personal data, under certain conditions.</span>
            </li>
            <li>
              <span>The right to restrict processing – </span>
              <span>You have the right to request that we restrict the processing of your personal data, under certain conditions.</span>
            </li>
            <li>
              <span>The right to object to processing – </span>
              <span>You have the right to object to our processing of your personal data, under certain conditions.</span>
            </li>
            <li>
              <span>The right to data portability – </span>
              <span>You have the right to request that we transfer the data that we have collected to another organization, </span>
              <span>or directly to you, under certain conditions.</span>
            </li>
            <li>
              <span>If you make a request, we have one month to respond to you. </span>
              <span>If you would like to exercise any of these rights, please <a className="link link-primary link-hover" href="/contact">contact us</a>.</span>
            </li>
          </ul>

          <h2 className="py-4">Children's Information</h2>

          <p>
            <span>Another part of our priority is adding protection for children while using the internet. </span>
            <span>We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. </span>
            <span>apsalus-tech.com does not knowingly collect any Personal Identifiable Information from children under the age of 13. </span>
            <span>If you think that your child provided this kind of information on our website, </span>
            <span>we strongly encourage you to <a className="link link-primary link-hover" href="/contact">contact us</a> immediately and we will do our best efforts </span>
            <span>to promptly remove such information from our records.</span>
          </p>

        </div>

      </main>

    </div>
  )
}

Privacy.getInitialProps = ({ query: { me } }) => {
  return { me };
}
