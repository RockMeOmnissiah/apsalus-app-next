import HomeBtn from '../components/home-btn';
import BackBtn from '../components/back-btn';

export default function Custom400({ me, errorCode, errorMsg }) {
  return <>
    <main className="flex flex-col items-center justify-center w-full h-full flex-1 px-10 bg-base text-center">
      <h1 className="py-4 text-bold text-3xl bg-error text-neutral-content rounded-lg w-full">400 - Bad Request</h1>
      <div className="pt-8" />
      <div>{errorCode}</div>
      <div className="pb-4">{errorMsg}</div>
      <div className="pt-4" />
      <HomeBtn />
      <div className="pt-4" />
      <BackBtn />
    </main>
  </>
}

Custom400.getInitialProps = ({ query: { me, errorCode, errorMsg } }) => {
  return { me, errorCode, errorMsg };
}
