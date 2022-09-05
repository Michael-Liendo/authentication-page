import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Url Shotenner</title>
      </Head>
      <div className="bg-slate-700 h-screen flex justify-center">
        <div className="w-2/5 m-auto p-6 bg-slate-50 rounded-md">
          <h1 className="text-4xl mb-10">Url Shortener</h1>
          <form>
            <label
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-600"
              htmlFor="original-url"
            >
              Original Url
            </label>
            <input
              className="transition duration-200 rounded-sm w-full mb-4 px-2 outline outline-offset-2 outline-blue-500 focus:scale-105"
              id="original-url"
              type="url"
              placeholder="Put a Original URL"
            />

            <label
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-600"
              htmlFor="original-url"
            >
              Shortener Url
            </label>
            <input
              className="trasition mb-7 duration-200 rounded-sm w-full px-2 outline outline-offset-2 outline-blue-500 focus:scale-105"
              id="original-url"
              type="text"
              placeholder="Put a Shortener Url"
            />

            <button
              type="button"
              className="trasition duration-200 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Shortener!!!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
