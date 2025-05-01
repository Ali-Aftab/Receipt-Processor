const { randomUUID } = require("crypto");
const { validateSyntax } = require("../validations");

const database = {};

const calculatePoints = (body) => {
  let point = 0;

  const { retailer, purchaseDate, purchaseTime, items, total } = body;

  point += retailer.replace(/[^A-Za-z0-9]/g, "").length;

  const decimal = Number(total.split(".")[1]);
  if (decimal === 0) point += 50;

  if (Number(total) % 0.25 === 0) point += 25;

  const itemsAmount = items.length;
  point += Math.floor(itemsAmount / 2) * 5;

  items.forEach((item) => {
    const { shortDescription, price } = item;
    const isMultipleofThree = shortDescription.trim().length % 3 === 0;
    if (isMultipleofThree) {
      point += Math.ceil(Number(price) * 0.2);
    }
  });

  const dayofPurchase = Number(purchaseDate.split("-")[2]);
  if (dayofPurchase % 2 !== 0) point += 6;

  const hour = Number(purchaseTime.split(":")[0]);
  const minute = Number(purchaseTime.split(":")[1]);
  if (hour === 15 || (hour === 14 && minute > 0)) {
    point += 10;
  }

  return point;
};

exports.createReceipt = async (req, res) => {
  try {
    const { retailer, purchaseDate, purchaseTime, items, total } = req.body;
    if (
      !retailer ||
      !purchaseDate ||
      !purchaseTime ||
      !items ||
      !total ||
      !validateSyntax(req.body)
    ) {
      return res.status(400).send({ error: "The receipt is invalid." });
    }

    const point = calculatePoints(req.body);
    const id = randomUUID();

    database[id] = point;
    // console.log("id: ", id);
    // console.log("point: ", point);
    res.status(200).send({ id });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "The receipt is invalid." });
    // res.status(500).send({ error: "server error" });
  }
};

exports.getReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    if (!database[id]) {
      res.status(404).send({ error: "No receipt found for that ID." });
    } else {
      res.status(200).send({ points: database[id] });
    }
  } catch (error) {
    console.error(error);
    res.status(404).send({ error: "No receipt found for that ID." });
    // res.status(500).send({ error: "Internal server error." });
  }
};
