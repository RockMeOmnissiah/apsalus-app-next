import Router from 'next/router';

export default function BackBtn() {
  return (
    <div className="btn btn-primary btn-sm w-full sm:w-1/4" onClick={() => Router.back()}>
      Back
    </div>
  )
}
