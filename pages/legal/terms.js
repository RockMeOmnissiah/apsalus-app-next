import Head from 'next/head';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel } from "@fortawesome/free-solid-svg-icons";

export default function Terms({ me }) {

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Terms of Service</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Terms of Service
          <FontAwesomeIcon className="ml-4" icon={faGavel} size="xs" />
        </h1>

        <div className="mt-8 text-left">

          <p className="text-center pb-4">
            <span>Welcome to apsalus-tech.com!</span>
          </p>

          <p className="pt-2">
            <span>These terms and conditions outline the rules and regulations for the use of apsalus-tech.com's Website, </span>
            <span>located at apsalus-tech.com. By accessing this website we assume you accept these terms and conditions. </span>
            <span>Do not continue to use apsalus-tech.com if you do not agree to all of the terms and conditions stated on this page.</span>
          </p>

          <p className="pt-2">
            <span>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice </span>
            <span>and all Agreements: "Client", "You" and "Your" refers to you, the person log </span>
            <span>on this website and compliant to the Company’s terms and conditions. </span>
            <span>"The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. </span>
            <span>"Party", "Parties", or "Us", refers to both the Client and ourselves. </span>
            <span>All terms refer to the offer, acceptance and consideration of payment necessary to </span>
            <span>undertake the process of our assistance to the Client in the most appropriate manner </span>
            <span>for the express purpose of meeting the Client’s needs in respect of provision of </span>
            <span>the Company’s stated services, in accordance with and subject to, prevailing law of the United States. </span>
            <span>Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, </span>
            <span>are taken as interchangeable and therefore as referring to same.</span>
          </p>

          <h2 className="py-4">Cookies</h2>

          <p>
            <span>We employ the use of cookies. By accessing apsalus-tech.com, </span>
            <span>you agreed to use cookies in agreement with the apsalus-tech.com's Privacy Policy. </span>
            <span>Most interactive websites use cookies to let us retrieve the user’s details for each visit. </span>
            <span>Cookies are used by our website to enable the functionality of certain areas to make it easier for </span>
            <span>people visiting our website. Some of our affiliate/advertising partners may also use cookies.</span>
          </p>

          <h2 className="py-4">License</h2>

          <p>
            <span>Unless otherwise stated, apsalus-tech.com and/or its licensors own the intellectual property rights </span>
            <span>for all material on apsalus-tech.com. All intellectual property rights are reserved. </span>
            <span>You may access this from apsalus-tech.com for your own personal use subjected to restrictions set in </span>
            <span>these terms and conditions.</span>
          </p>

          <p className="pt-2">
            <span>You must not:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>Republish material from apsalus-tech.com</li>
            <li>Sell, rent or sub-license material from apsalus-tech.com</li>
            <li>Reproduce, duplicate or copy material from apsalus-tech.com</li>
            <li>Redistribute content from apsalus-tech.com</li>
          </ul>

          <p className="pt-2">
            <span>This Agreement shall begin on the date hereof. </span>
            <span>Parts of this website offer an opportunity for users to post and exchange opinions and </span>
            <span>information in certain areas of the website. apsalus-tech.com does not filter, edit, publish or review </span>
            <span>Comments prior to their presence on the website. Comments do not reflect the views and opinions of apsalus-tech.com, </span>
            <span>its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. </span>
            <span>To the extent permitted by applicable laws, apsalus-tech.com shall not be liable for the Comments or for any liability, </span>
            <span>damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance </span>
            <span>of the Comments on this website. </span>
            <span>apsalus-tech.com reserves the right to monitor all Comments and to </span>
            <span>remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</span>
          </p>

          <p className="pt-2">You warrant and represent that:</p>

          <ul className="list-disc pl-4 pt-2">
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>

          <p className="pt-2">
            <span>You hereby grant apsalus-tech.com a non-exclusive license to use, reproduce, edit and </span>
            <span>authorize others to use, reproduce and edit any of your Comments </span>
            <span>in any and all forms, formats or media.</span>
          </p>

          <h2 className="py-4">Hyperlinking to our Content</h2>

          <p>
            <span>The following organizations may link to our Website without prior written approval:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
            <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
          </ul>

          <p className="pt-2">
            <span>These organizations may link to our home page, </span>
            <span>to publications or to other Website information so long as the link: </span>
            <span>(a) is not in any way deceptive; </span>
            <span>(b) does not falsely imply sponsorship, endorsement or approval </span>
            <span>of the linking party and its products and/or services; </span>
            <span>and (c) fits within the context of the linking party’s site.</span>
          </p>

          <p className="pt-2">
            <span>We may consider and approve other link requests from the following types of organizations:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>commonly-known consumer and/or business information sources;</li>
            <li>dot.com community sites;</li>
            <li>associations or other groups representing charities;</li>
            <li>online directory distributors;</li>
            <li>internet portals;</li>
            <li>accounting, law and consulting firms; and</li>
            <li>educational institutions and trade associations.</li>
          </ul>

          <p className="pt-2">
            <span>We will approve link requests from these organizations if we decide that: </span>
            <span>(a) the link would not make us look unfavorably to ourselves or to our accredited businesses; </span>
            <span>(b) the organization does not have any negative records with us; </span>
            <span>(c) the benefit to us from the visibility of the hyperlink compensates the absence of apsalus-tech.com; </span>
            <span>and (d) the link is in the context of general resource information.</span>
          </p>

          <p className="pt-2">
            <span>These organizations may link to our home page so long as the link: </span>
            <span>(a) is not in any way deceptive; </span>
            <span>(b) does not falsely imply sponsorship, endorsement or approval </span>
            <span>of the linking party and its products or services; </span>
            <span>and (c) fits within the context of the linking party’s site.</span>
          </p>

          <p className="pt-2">
            <span>If you are one of the organizations listed in paragraph 2 above and are interested </span>
            <span>in linking to our website, you must inform us by sending an e-mail to apsalus-tech.com. </span>
            <span>Please include your name, your organization name, contact information as well as the URL of your site, </span>
            <span>a list of any URLs from which you intend to link to our Website, </span>
            <span>and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</span>
          </p>

          <p className="pt-2">
            <span>Approved organizations may hyperlink to our Website as follows:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>By use of our corporate name; or</li>
            <li>By use of the uniform resource locator being linked to; or</li>
            <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
          </ul>

          <p className="pt-2">
            <span>No use of apsalus-tech.com's logo or other artwork will be allowed for linking absent </span>
            <span>a trademark license agreement.</span>
          </p>

          <h2 className="py-4">iFrames</h2>

          <p>
            <span>Without prior approval and written permission, you may not create frames around our Webpages </span>
            <span>that alter in any way the visual presentation or appearance of our Website.</span>
          </p>

          <h2 className="py-4">Content Liability</h2>

          <p>
            <span>We shall not be hold responsible for any content that appears on your Website. </span>
            <span>You agree to protect and defend us against all claims that is rising on your Website. </span>
            <span>No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, </span>
            <span>or which infringes, otherwise violates, or advocates the infringement or other violation of, </span>
            <span>any third party rights.</span>
          </p>

          <h2 className="py-4">Your Privacy</h2>

          <p>
            <span>Please read our <a className="link link-primary link-hover" href="/legal/privacy">Privacy Policy</a></span>
          </p>

          <h2 className="py-4">Reservation of Rights</h2>

          <p>
            <span>We reserve the right to request that you remove all links or any particular link </span>
            <span>to our Website. You approve to immediately remove all links to our Website upon request. </span>
            <span>We also reserve the right to amen these terms and conditions and it’s linking policy at any time. </span>
            <span>By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</span>
          </p>

          <h2 className="py-4">Removal of links from our website</h2>

          <p>
            <span>If you find any link on our Website that is offensive for any reason, </span>
            <span>you are free to <a className="link link-primary link-hover" href="/contact">contact us</a>. </span>
            <span>We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</span>
          </p>

          <p className="pt-2">
            <span>We do not ensure that the information on this website is correct, </span>
            <span>we do not warrant its completeness or accuracy; nor do we promise to ensure that the website </span>
            <span>remains available or that the material on the website is kept up to date.</span>
          </p>

          <h2 className="py-4">Disclaimer</h2>

          <p>
            <span>To the maximum extent permitted by applicable law, we exclude all representations, </span>
            <span>warranties and conditions relating to our website and the use of this website. </span>
            <span>Nothing in this disclaimer will:</span>
          </p>

          <ul className="list-disc pl-4 pt-2">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>

          <p className="pt-2">
            <span>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: </span>
            <span>(a) are subject to the preceding paragraph; and </span>
            <span>(b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, </span>
            <span>in tort and for breach of statutory duty.</span>
            <span>As long as the website and the information and services on the website are provided free of charge, </span>
            <span>we will not be liable for any loss or damage of any nature.</span>
          </p>

        </div>

      </main>



    </div>
  )
}

Terms.getInitialProps = ({ query: { me } }) => {
  return { me };
}
