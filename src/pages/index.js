import Head from 'next/head';
import { useState } from 'react';
import UrlInformation from '../components/UrlInformation';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  function inputHandler(event) {
    setOriginalUrl(event.target.value);
    setData({
      url: event.target.value,
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (data.url.length < 1) return;

    try {
      const request = await fetch(`/api/new`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      const response = await request.json();
      if (response?.status === 400) {
        throw response.message;
      }

      setStatus(response);
    } catch (error) {
      setError(error.toString());
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    setOriginalUrl('');
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

  return (
    <>
      <Head>
        <title>Url Shotenner</title>
      </Head>
      <div className="bg-slate-700 h-screen flex justify-center">
        <div className="w-1/1 sm:w-1/2 lg:w-1/3 m-auto p-6 bg-slate-50 rounded-md">
          {status ? (
            <UrlInformation setStatus={setStatus} data={status} />
          ) : (
            <NewUrlForm />
          )}
          {error ? (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
