import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  const router = useRouter();

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

    setStatus(response);
    setTimeout(() => {
      setStatus(null);
    }, 6000);

    setOriginalUrl('');
  }

  return (
    <>
      <Head>
        <title>Url Shotenner</title>
      </Head>
      <div className="bg-slate-700 h-screen flex justify-center">
        <div className="w-2/5 m-auto p-9 bg-slate-50 rounded-md">
          <h1 className="text-4xl mb-10">Url Shortener</h1>
          <form onSubmit={onSubmit}>
            <label
              className="block mb-5 text-lg font-medium text-gray-900 dark:text-gray-600"
              htmlFor="original-url"
            >
              Original Url
            </label>
            <input
              value={originalUrl}
              onChange={inputHandler}
              className="transition duration-200 rounded-sm w-full mb-4 px-2 outline outline-offset-2 outline-blue-500 focus:scale-105"
              id="original-url"
              type="text"
              placeholder="Put a Original URL"
              required
            />

            {status ? (
              <div>
                <p className="my-5">
                  Your short url was created. You hash is{' '}
                  <span>{status.hash}</span>
                </p>
                <Link
                  href={`/${status.hash}`}
                >{`${router.pathname}/${status.hash}`}</Link>
              </div>
            ) : (
              <div></div>
            )}
            <button
              type="submit"
              className="trasition duration-200 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 mb-2"
            >
              Shortener!!!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
