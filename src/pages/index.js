import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  function inputHandler(event) {
    setOriginalUrl(event.target.value);
    setData({
      url: event.target.value,
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (data.url.length < 1) return;

    const request = await fetch(`/api/new`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const response = await request.json();

    setOriginalUrl('');

    setStatus(response);
  }

  function NewUrlForm() {
    return (
      <>
        <form onSubmit={onSubmit}>
          <label
            className="block mb-5 text-lg font-medium text-gray-900 dark:text-gray-600"
            htmlFor="original-url"
          >
            URL
          </label>
          <input
            value={originalUrl}
            onChange={inputHandler}
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
            id="original-url"
            type="text"
            placeholder="https://example.com"
            required
          />

          <button
            type="submit"
            className="trasition duration-200 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 mb-2 w-full"
          >
            Shortener!!!
          </button>
        </form>
      </>
    );
  }

  function UrlInformation({ data }) {
    const expiresDate = new Date(data.expires_at);

    function handlerStatus() {
      setStatus(null);
    }

    return (
      <>
        <h1 className="mb-3.5 font-bold text-blue-400">
          <Link
            href={`/${data.hash}`}
          >{`${window.location.origin}/${data.hash}`}</Link>
        </h1>
        <h2 className="mt-2.5 mb-0.5">Original URL</h2>
        <p className="font-medium">{data.original_url}</p>
        <h3 className="mt-2.5 mb-0.5">Hash</h3>
        <p className="font-medium">{data.hash}</p>
        <h4 className="mt-2.5 mb-0.5">ID</h4>
        <p className="font-medium">{data.id}</p>
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

  return (
    <>
      <Head>
        <title>Url Shotenner</title>
      </Head>
      <div className="bg-slate-700 h-screen flex justify-center">
        <div className="w-1/1 sm:w-1/2 lg:w-1/3 m-auto p-6 bg-slate-50 rounded-md">
          {status ? <UrlInformation data={status} /> : <NewUrlForm />}
        </div>
      </div>
    </>
  );
}
