import HomeBtn from '../components/home-btn';
import BackBtn from '../components/back-btn';

export default function Custom500({ me }) {
  return <>
    <main className="flex flex-col items-center justify-center w-full h-full flex-1 px-10 bg-base text-center">
      <h1 className="py-4 text-bold text-3xl bg-error text-neutral-content rounded-lg w-full">500 - Server Error</h1>
      <div className="pt-8" />
      <HomeBtn />
      <div className="pt-4" />
      <BackBtn />
    </main>
  </>
}

// Custom500.getInitialProps = ({ query: { me } }) => {
//   return { me };
// }
