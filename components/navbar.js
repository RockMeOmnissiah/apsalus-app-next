import logoPic from "../public/images/logo.png";
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmbulance, faBars, faBoxes, faClock, faEnvelope, faImages, faNewspaper, faPercent, faPlug,
  faQuestionCircle, faReceipt, faSignInAlt, faSignOutAlt, faStopwatch, faTag, faTags, faUserAltSlash,
  faUserCircle, faUserPlus, faUsers, faWrench
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

import CartBasket from "./ecommerce/cart-basket";
import { Guard_ReactSailsAPIErrors } from "../guards/error";

export default function NavBar({me,
  cartItems, onAddCartItem, onRemoveCartItem,
  innerContent, footer}) {

  const router = useRouter();
  if (router.pathname == '/404' || router.pathname == '/500') return (
    <span className="pb-16">
      {innerContent(cartItems, onAddCartItem, onRemoveCartItem)} {/* <-- APP's "pages" */}
    </span>
  )

  const [blogCats, setBlogCats] = useState([]);
  const [prodCats, setProdCats] = useState([]);
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project

    async function callAPI() {
      // await fetch('/api/csrfToken', {
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // }).then( async(response) => {

        let data = {};
        // data._csrf = (await response.json())._csrf;

        await fetch('/api/product/category/get', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then( async (prodCatResponse) => {
          if( Guard_ReactSailsAPIErrors(router, prodCatResponse) ) {
            setProdCats(await prodCatResponse.json());
          }
        });

        await fetch('/api/blog/category/get', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then( async (blogCatResponse) => {
          if( Guard_ReactSailsAPIErrors(router, blogCatResponse) ) {
            setBlogCats(await blogCatResponse.json());
          }
        });

      // });
    }
    callAPI();

  }, []);

  let cartBasket = (
    <CartBasket
      me={me}
      cartItems={cartItems}
      onAdd={onAddCartItem}
      onRemove={onRemoveCartItem}
    />
  );

  let accountDropdown = (
    <div className="dropdown dropdown-end w-full">
      <div tabIndex='0' className={"btn btn-primary " + ((['/account', '/account/orders'].indexOf(router.asPath) != -1) ? '' : 'btn-outline') + " btn-sm w-full"}>
        <span className="mr-2">Account</span>
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <span tabIndex='0' style={{zIndex: 999}} className="p-2 shadow menu card bordered dropdown-content bg-neutral-focus text-neutral-content rounded-box w-64">
        <li>
          <a href='/account/orders' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/account/orders' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faReceipt} size="sm" />
            <span className="ml-2">Orders</span>
          </a>
        </li>
        <li>
          <a href='/account' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/account' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faWrench} size="sm" />
            <span className="ml-2">Settings</span>
          </a>
        </li>
        <li>
          <a href='/api/account/logout' className="link link-primary link-hover text-md font-bold">
            <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
            <span className="ml-2">Logout</span>
          </a>
        </li>
      </span>
    </div>
  );

  let adminDropdown = (
    <div className="dropdown dropdown-end w-full">
      <div tabIndex='0' className={"btn btn-primary " + ((['/email-blasts', '/users', '/orders', '/products', '/promo-codes', '/uploaded-images', '/cron-locks'].indexOf(router.asPath) != -1) ? '' : 'btn-outline') + " btn-sm w-full"}>
        <span className="mr-2">Admin</span>
        <FontAwesomeIcon icon={faPlug} />
      </div>
      <span tabIndex='0' style={{zIndex: 999}} className="p-2 shadow menu card bordered dropdown-content bg-neutral-focus text-neutral-content rounded-box w-64">
        <li>
          <a href='/email-blasts' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/email-blasts' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faEnvelope} size="sm" />
            <span className="ml-2">Email Blasts</span>
          </a>
        </li>
        <li>
          <a href='/orders' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/orders' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faReceipt} size="sm" />
            <span className="ml-2">Orders</span>
          </a>
        </li>
        <li>
          <a href='/products' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/products' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faBoxes} size="sm" />
            <span className="ml-2">Products</span>
          </a>
        </li>
        <li>
          <a href='/promo-codes' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/promo-codes' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faPercent} size="sm" />
            <span className="ml-2">Promo Codes</span>
          </a>
        </li>
        <li>
          <a href='/uploaded-images' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/uploaded-images' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faImages} size="sm" />
            <span className="ml-2">Uploaded Images</span>
          </a>
        </li>
        <li>
          <a href='/cron-locks' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/cron-locks' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faStopwatch} size="sm" />
            <span className="ml-2">Cron Locks</span>
          </a>
        </li>
        <li>
          <a href='/users' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/users' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faUsers} size="sm" />
            <span className="ml-2">Users</span>
          </a>
        </li>
      </span>
    </div>
  );

  let blogCatSlugs = blogCats.map(function(cat, idx){
    return '/blog/posts/view/category/' + cat.slug
  });
  let blogCatLinks = (
    blogCats.map(function(cat, idx){

      let parentString = '';
      if (cat.parent) {
        let nextCat = cat;

        while (nextCat != undefined) {
          nextCat = blogCats.find(x => x.id == nextCat.parent);
          if (nextCat) {
            parentString = nextCat.title + ' > ' + parentString;
          }
        }
      }

      return (
        <li key={idx}>
          <a href={blogCatSlugs[idx]}
            className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == blogCatSlugs[idx] ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faTag} size="sm" />
            <span className="ml-2">{parentString}{cat.title}</span>
          </a>
        </li>
      );
    })
  );
  let blogDropdown = (
    <div className="dropdown dropdown-end w-full">
      <div tabIndex='0' className={"btn btn-primary " + ((blogCatSlugs.concat(['/blog/posts/recent', '/blog/posts', '/blog/categories']).indexOf(router.asPath) != -1) ? '' : 'btn-outline') + " btn-sm w-full"}>
        <span className="mr-2">Blog</span>
        <FontAwesomeIcon icon={faNewspaper} />
      </div>
      <span tabIndex='0' style={{zIndex: 999}} className="p-2 shadow menu card bordered dropdown-content bg-neutral-focus text-neutral-content rounded-box w-64">
        <li>
          <a href='/blog/posts/recent' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/blog/posts/recent' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faClock} size="sm" />
            <span className="ml-2">Recent Posts</span>
          </a>
        </li>
        <li>
          <a href='/blog/posts' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/blog/posts' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faNewspaper} size="sm" />
            <span className="ml-2">All Posts</span>
          </a>
        </li>
        {blogCatLinks}
        <li>
          <a href='/blog/categories' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/blog/categories' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faTags} size="sm" />
            <span className="ml-2">Categories</span>
          </a>
        </li>
      </span>
    </div>
  );

  let helpDropdown = (
    <div className="dropdown dropdown-end w-full">
      <div tabIndex='0' className={"btn btn-primary " + ((['/faq', '/contact'].indexOf(router.asPath) != -1) ? '' : 'btn-outline') + " btn-sm w-full"}>
        <span className="mr-2">Help</span>
        <FontAwesomeIcon icon={faAmbulance} />
      </div>
      <span tabIndex='0' style={{zIndex: 999}} className="p-2 shadow menu card bordered dropdown-content bg-neutral-focus text-neutral-content rounded-box w-64">
        <li>
          <a href="/faq" className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/faq' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
            <span className="ml-2">FAQ</span>
          </a>
        </li>
        <li>
          <a href='/contact' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/contact' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faEnvelope} size="sm" />
            <span className="ml-2">Contact Us</span>
          </a>
        </li>
      </span>
    </div>
  );


  let prodCatSlugs = prodCats.map(function(cat, idx){
    return '/products/view/category/' + cat.slug
  });
  let prodCatLinks = (
    prodCats.map(function(cat, idx){

      let parentString = '';
      if (cat.parent) {
        let nextCat = cat;

        while (nextCat != undefined) {
          nextCat = prodCats.find(x => x.id == nextCat.parent);
          if (nextCat) {
            parentString = nextCat.title + ' > ' + parentString;
          }
        }
      }

      return (
        <li key={idx}>
          <a href={prodCatSlugs[idx]}
            className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == prodCatSlugs[idx] ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faTag} size="sm" />
            <span className="ml-2">{parentString}{cat.title}</span>
          </a>
        </li>
      );
    })
  );
  let productsDropdown = (
    <div className="dropdown dropdown-end w-full">
      <div tabIndex='0' className={"btn btn-primary " + ((prodCatSlugs.concat(['/products/recent', '/products/categories']).indexOf(router.asPath) != -1) ? '' : 'btn-outline') + " btn-sm w-full"}>
        <span className="mr-2">Products</span>
        <FontAwesomeIcon icon={faBoxes} />
      </div>
      <span tabIndex='0' style={{zIndex: 999}} className="p-2 shadow menu card bordered dropdown-content bg-neutral-focus text-neutral-content rounded-box w-64">
        <li>
          <a href='/products/recent' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/products/recent' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faClock} size="sm" />
            <span className="ml-2">Recent Products</span>
          </a>
        </li>
        {/* <li>
          <a href='/blog/posts' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/blog/posts' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faNewspaper} size="sm" />
            <span className="ml-2">All Posts</span>
          </a>
        </li> */}
        {prodCatLinks}
        <li>
          <a href='/products/categories' className={"link link-primary link-hover text-md font-bold w-full " + (router.asPath == '/products/categories' ? 'bg-accent' : '')} >
            <FontAwesomeIcon icon={faTags} size="sm" />
            <span className="ml-2">Categories</span>
          </a>
        </li>
      </span>
    </div>
  );

  let faqLink = (
    <a href='/faq' className={"btn btn-primary " + (router.asPath == '/faq' ? '' : 'btn-outline') + " btn-sm text-md font-bold w-full"}>
      FAQ
      <FontAwesomeIcon className="ml-2" icon={faQuestionCircle} />
    </a>
  );

  let loginLink = (
    <a href='/login' className={"btn btn-primary " + (router.asPath == '/login' ? '' : 'btn-outline') + " btn-sm text-md font-bold w-full"}>
      Login
      <FontAwesomeIcon className="ml-2" icon={faSignInAlt} />
    </a>
  );

  let signupLink = (
    <a href='/signup' className={"btn btn-success " + (router.asPath == '/signup' ? '' : 'btn-outline') + " btn-sm text-md font-bold w-full"}>
      Sign Up
      <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
    </a>
  );

  let desktopNavigation = (<>
    <div className="mr-2">{productsDropdown}</div>
    <div className="mr-2">{blogDropdown}</div>

    {/* LOGGED-IN NAVIGATION */}
    {me && <>
      {me?.isSuperAdmin && <>
        <div className="mr-2">{adminDropdown}</div>
        </>}

      <span className="ml-6 mr-2">
        {cartBasket}
      </span>
      <div className="mr-2">{helpDropdown}</div>
      <div className="mr-2">{accountDropdown}</div>
      </>}

    {/* LOGGED-OUT NAVIGATION */}
    {!me && <>
      <div className="mr-2">{faqLink}</div>
      <div className="ml-6 mr-2">{loginLink}</div>
      <div className="mr-1">{signupLink}</div>
      </>}
  </>);

  let mobileNavigation = (<>
    <div className="mb-2">{productsDropdown}</div>
    <div className="mb-2">{blogDropdown}</div>

    {/* LOGGED-IN NAVIGATION */}
    {me && <>
      {me.isSuperAdmin && <>
        <div className="mb-6">{adminDropdown}</div>
        </>}

      <span className="mb-2">
        {cartBasket}
      </span>
      <div className="mb-2">{helpDropdown}</div>
      <div className="mb-2">{accountDropdown}</div>
      </>}

    {/* LOGGED-OUT NAVIGATION */}
    {!me && <>
      <div className="mb-6 w-full">{faqLink}</div>
      <div className="mb-2 w-full">{loginLink}</div>
      <div className="mb-2 w-full">{signupLink}</div>
      </>}
  </>);

  return <>
    <div className="shadow bg-base-200 drawer drawer-end">
      <input id="menuDrawer" type="checkbox" className="drawer-toggle" />

      {/* BEGIN APP BODY */}
      <div className="flex flex-col drawer-content min-h-screen">

        {/* MAIN NAV BAR w/ DESKTOP VIEW */}
        <div className="w-full navbar bg-neutral text-neutral-content">
          <div className="flex-1 px-2 mx-2">
            <a href='/' className="link link-primary link-hover text-lg font-bold">
              <Image
                src={logoPic}
                width={145*0.66}
                height={40*0.66}
              />
            </a>
            <label className="input-group ml-16">
              <span className="label-text text-bold text-xs px-2">Theme</span>
              <select
                className="select select-bordered select-accent text-base-content w-1/2 sm:w-1/4 select-xs max-w-xs"
                data-choose-theme
              >
                <option value="custom">Default</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="cupcake">Cupcake</option>
                <option value="bumblebee">Bumblebee</option>
                <option value="emerald">Emerald</option>
                <option value="corporate">Corporate</option>
                <option value="synthwave">Synthwave</option>
                <option value="retro">Retro</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="valentine">Valentine</option>
                <option value="halloween">Halloween</option>
                <option value="garden">Garden</option>
                <option value="forest">Forest</option>
                <option value="aqua">Aqua</option>
                <option value="lofi">LoFi</option>
                <option value="pastel">Pastel</option>
                <option value="fantasy">Fantasy</option>
                {/* <option value="wireframe">Wireframe</option> */}
                {/* <option value="black">Black</option> */}
                <option value="luxury">Luxury</option>
                <option value="dracula">Dracula</option>
                <option value="cmyk">CMYK</option>
              </select>
            </label>
          </div>
          <div className="flex-none lg:hidden">
            <label htmlFor="menuDrawer" className="btn btn-primary btn-sm">
              <FontAwesomeIcon icon={faBars} />
            </label>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu horizontal overflow-visible">
              {desktopNavigation}
            </ul>
          </div>
        </div>
        {/* END MAIN NAV BAR w/ DESKTOP VIEW */}

        {/* Alert if email has not been confirmed */}
        {(me && me?.emailChangeCandidate) &&
          <div className="alert alert-warning">
            <div className="flex-1">
              <FontAwesomeIcon icon={faUserAltSlash} size="lg" />
              <label className="ml-2">Your updated email address needs verification. Until you click the link sent to <strong>{me.emailChangeCandidate}</strong>, you'll still need to sign in as <strong>{me.emailAddress}</strong>.</label>
            </div>
          </div>}
        {(me && (me?.emailStatus === 'unconfirmed')) &&
          <div className="alert alert-warning">
            <div className="flex-1">
              <FontAwesomeIcon icon={faUserAltSlash} size="lg" />
              <label className="ml-2">Your email address still needs verification. Your account access may be limited until you click the link sent to <strong>{me.emailChangeCandidate ? me.emailChangeCandidate : me.emailAddress}</strong>.</label>
            </div>
          </div>}

        <span className="pb-16">
          {innerContent(cartItems, onAddCartItem, onRemoveCartItem)} {/* <-- APP's "pages" */}
        </span>

        {footer}
        {/* END APP BODY */}

      </div>
      {/* MOBILE VIEW */}
      <div className="drawer-side">
        <label htmlFor="menuDrawer" className="drawer-overlay"></label>
        <ul className="p-4 menu w-80 bg-neutral text-neutral-content overflow-visible" style={{height: '150vh'}}>
          {mobileNavigation}
        </ul>
      </div>
      {/* END MOBILE VIEW */}
    </div>
  </>
}
