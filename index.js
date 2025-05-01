const express = require("express");
const morgan = require("morgan");

const receiptRoutes = require("./routes/receipts.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/receipts", receiptRoutes);

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const startServer = () => {
  app.listen(process.env.PORT || PORT, () =>
    console.log(`Listening on ${PORT}`)
  );
};
startServer();
