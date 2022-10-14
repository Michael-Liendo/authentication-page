export default async function handler(req, res) {
  const { hash } = req.query;
  const request = await fetch(`${process.env.SERVER_URL}${hash}`);
  const response = await request.json();

  res.json(response);
}
