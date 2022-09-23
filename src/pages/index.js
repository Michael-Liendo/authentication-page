import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import UrlInformation from '../components/UrlInformation';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(['unsplash']);
  const [backgroundData, setBackgroundData] = useState(null);

  useEffect(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    async function getRandomPhoto() {
      if (cookies.unsplash) {
        setBackgroundData(cookies.unsplash);
      } else {
        const request = await fetch('/api/unplash');
        const response = await request.json();

        console.log(response);
        if (response.status === 401) {
          setError('UNPLASH' + response.errors[0].toString());
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        } else if (response.status === 500) {
          setError('UNPLASH' + response.message.message.toString());
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }

        setBackgroundData({
          url: response.response.urls.regular,
          author: {
            name: response.response.user.name,
            username: response.response.user.username,
          },
        });
        setCookie(
          'unsplash',
          {
            url: response.response.urls.regular,
            author: {
              name: response.response.user.name,
              username: response.response.user.username,
            },
          },
          {
            expires: tomorrow,
          },
        );
      }
    }
    getRandomPhoto();
  }, [cookies, setCookie, backgroundData]);

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
      <div
        className="bg-slate-700 bg-cover h-screen flex justify-center flex-col"
        style={{ backgroundImage: 'url(' + backgroundData?.url + ')' }}
      >
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
        <div>
          {backgroundData ? (
            <span className="text-white">
              Photo by{' '}
              <a
                href={`https://unsplash.com/@${backgroundData.author.username}?utm_source=URL_shortener&utm_medium=referral`}
                target="_blank"
                rel="noreferrer"
              >
                {backgroundData?.author?.name}
              </a>{' '}
              on{' '}
              <a
                href="https://unsplash.com/?utm_source=URL_shortener&utm_medium=referral"
                rel="noreferrer"
                target="_blank"
              >
                Unsplash
              </a>
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}
