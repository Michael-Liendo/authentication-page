export default async function handler(req, res) {
  const { hash } = req.query;
  res.redirect(`${process.env.SERVER_URL}${hash}`);
}
