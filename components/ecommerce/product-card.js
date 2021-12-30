// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartPlus, faCheck, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ProductAddCart from "./product-add-cart";

export default function ProductCard({me, router, item, categoryOptions, cartItems, onAdd}) {

  const images = item.image_urls.split(',');

  return <>
    <div className="card bordered shadow bg-neutral text-neutral-content p-4">
      <figure className="rounded-lg border">
        <img className="rounded-lg h-48 sm:h-96" src={(images.length > 0) && images[0]} />
      </figure>
      <div className="card-body">
        <h2 className="card-title bg-primary text-secondary rounded-lg w-full text-bold text-2xl sm:text-4xl">{item.title}</h2>
        <h4 className="card-subtitle">
          {item.categories.map(function(pCat, idx){

            let parentString = '';
            if (pCat.parent) {
              let nextCat = pCat;

              while (nextCat != undefined) {
                nextCat = categoryOptions.find(x => x.id == nextCat.parent);
                if (nextCat) {
                  parentString = nextCat.title + ' > ' + parentString;
                }
              }
            }

            return <span key={idx}>
              <a
                className="link link-primary link-hover font-bold text-sm sm:text-md"
                href={"/products/view/category/" + pCat.slug}>{parentString}{pCat.title}</a>
              {(item.categories.indexOf(pCat) != (item.categories.length - 1)) && <span>,&nbsp;</span>}
            </span>;
            })}
        </h4>
        <p className="mt-2 mb-4">{item.description}</p>

        <div className="h-40 sm:h-80 w-full p-4 space-x-4 carousel carousel-center border mx-auto bg-gray-400 rounded-box">
          {(images.length > 0) && images.slice(1) && images.slice(1).map( (iUrl, idx) => {

            return <div key={idx} className="carousel-item w-full items-center">
                      <img
                        src={iUrl}
                      />
                    </div>;

          })}
        </div>

        <div className={(me ? 'h-10' : 'h-32') +  " mx-auto justify-center card-actions text-base-content"} >
          <ProductAddCart me={me} router={router} item={item} cartItems={cartItems} onAdd={onAdd} />
        </div>
      </div>
    </div>
  </>;
}
