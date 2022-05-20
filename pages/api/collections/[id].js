export default function handler(req, res) {
  const { method, query: id } = req;
  const { collection } = require("../../../data/collection.json");
  const filteredItem = collection.filter((item) => item.id === id.id);

  if (method === "GET") {
    res.status(200).json({ filteredItem });
  }
}
