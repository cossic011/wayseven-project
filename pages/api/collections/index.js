export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const jsonData = require("../../../data/tree.json");
    res.status(200).json({ jsonData });
  }
}
