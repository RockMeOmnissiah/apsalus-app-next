import HomeBtn from '../components/home-btn';
import BackBtn from '../components/back-btn';

export default function Custom498({ me }) {
  return <>
    <main className="flex flex-col items-center justify-center w-full h-full flex-1 px-10 text-center">
      <h1 className="py-4 text-bold text-3xl">498 - Expired or Invalid</h1>
      <HomeBtn />
      <div className="pt-4" />
      <BackBtn />
    </main>
  </>
}

Custom498.getInitialProps = ({ query: { me } }) => {
  return { me };
}
