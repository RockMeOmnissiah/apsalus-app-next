import Head from 'next/head';

import { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';

import { useRouter } from 'next/router';
import ProductCard from '../components/ecommerce/product-card';
import { Guard_ReactSailsAPIErrors } from '../guards/error';

import Banner from '../components/banner';
import { FREE_SHIP_ORDER_PRICE } from '../utils/constants';

export default function Home({ me, categoryOptions, cartItems, onAddCartItem, onRemoveCartItem }) {

  const router = useRouter();

  // const [productData, setProductData] = useState(null);
  // useEffect(() => {
  //   async function callAPI(productID) {

  //     await fetch('/api/product/' + productID, {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // body: JSON.stringify(data),
  //     }).then( async (response) => {
  //       if( Guard_ReactSailsAPIErrors(router, response) ) {
  //         setProductData(await response.json());
  //       }
  //     });
  //   }
  //   callAPI('8waj54x3KcUrl1NI');
  // }, []);
  // if (!productData) { return (null); }

  return <>
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Apsalus Tech</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 pt-4 pb-16 mb-16 bg-base-200 text-center">
        <h1 className="text-3xl sm:text-6xl font-bold bg-primary text-secondary rounded-lg w-full">
          Welcome to{' '}
          <a className="link link-secondary link-hover" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <Banner bannerText={"Use code 'welcome-10' for 10% off. Free shipping on US orders over $" + FREE_SHIP_ORDER_PRICE + "!"} />
        <div className="py-4">
          <Doughnut
            width={'300px'}
            height={'300px'}
            data={{
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                hoverOffset: 10,
              }],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  bottom: 5
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Custom Chart Title',
                  padding: {
                    top: 5,
                    bottom: 5
                  },
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                },
                legend: {
                  display: true,
                  labels: {
                    font: {
                      size: 12,
                    }
                  },
                },
              }
            }}
          />
        </div>
        <div className="pt-4">
          <div className="py-2 mx-auto">
            {/* <ProductCard
              me={me}
              router={router}
              item={productData}
              cartItems={cartItems}
              onAdd={onAddCartItem}
              categoryOptions={categoryOptions}
            /> */}
          </div>
        </div>
      </main>

    </div>
  </>
}

Home.getInitialProps = ({ query: { me, categoryOptions } }) => {
  return { me, categoryOptions };
}
