import HomeBtn from '../components/home-btn';
import BackBtn from '../components/back-btn';

export default function Custom401({ me, referer }) {
  return <>
    <main className="flex flex-col items-center justify-center w-full h-full flex-1 px-10 bg-base text-center">
      <h1 className="py-4 text-bold text-3xl bg-error text-neutral-content rounded-lg w-full">401 - Unauthorized</h1>
      <div className="pt-2" />
      {!me &&
        <a href={'/login?referer=' + referer} className="btn btn-success btn-outline btn-sm mt-8 w-full sm:w-1/4">
          Login
        </a>}
      <div className="pt-4 pb-4" />
      <HomeBtn />
      <div className="pt-4" />
      <BackBtn />
    </main>
  </>
}

Custom401.getInitialProps = ({ query: { me, referer } }) => {
  return { me, referer };
}
