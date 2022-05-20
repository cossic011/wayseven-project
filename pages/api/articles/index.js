export default function handler(req, res) {
  const { method } = req;
  const { collection } = require("../../../data/collection.json");

  if (method === "GET") {
    res.status(200).json({ collection });
  }
}
