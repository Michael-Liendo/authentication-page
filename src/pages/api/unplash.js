import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export default async function handler(req, res) {
  try {
    const randomPhoto = await unsplash.photos.getRandom({
      orientation: 'landscape',
    });
    res.status(200).json(randomPhoto);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
}
