import Link from 'next/link';

export default function UrlInformation({ setStatus, data }) {
  const expiresDate = new Date(data.expires_at);

  function handlerStatus() {
    setStatus(null);
  }

  return (
    <>
      <h1 className="transition duration-200 mb-3.5 underline font-bold text-gray-800 hover:text-gray-700">
        <Link
          href={`/${data.hash}`}
        >{`${window.location.origin}/${data.hash}`}</Link>
      </h1>
      <h2 className="mt-2.5 mb-0.5">Original URL</h2>
      <p className="font-medium">
        <a href={data.original_url} target="_blank" rel="noreferrer">
          {data.original_url}
        </a>
      </p>
      <h3 className="mt-2.5 mb-0.5">Hash</h3>
      <p className="font-medium">{data.hash}</p>
      <h5 className="mt-2.5 mb-0.5">Expires at</h5>
      <p className="font-medium">{expiresDate.toLocaleDateString()}</p>
      <button
        onClick={handlerStatus}
        type="submit"
        className="trasition duration-200 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 mb-2 w-full"
      >
        Create another link
      </button>
    </>
  );
}
