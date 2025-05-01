const validateSyntax = (body) => {
  const { retailer, purchaseDate, purchaseTime, items, total } = body;
  const errorList = [];

  const retailerSyntax = new RegExp("^[\\w\\s\\-&]+$");
  const purchaseDateSyntax = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}");
  const shortDescriptionSyntax = new RegExp("^[\\w\\s\\-]+$");
  const decimalSyntax = new RegExp("^\\d+\\.\\d{2}$");

  if (!retailerSyntax.test(retailer)) {
    errorList.push("retailer syntax is incorrect");
  }
  if (!purchaseDateSyntax.test(purchaseDate)) {
    errorList.push("purchaseDate is incorrect");
  }

  const timeArr = purchaseTime.split(":");
  if (
    timeArr.length !== 2 ||
    timeArr[0].length !== 2 ||
    timeArr[1].length !== 2 ||
    Number.isNaN(Number(timeArr[0])) ||
    Number.isNaN(Number(timeArr[1])) ||
    Number(timeArr[0]) > 23 ||
    Number(timeArr[1]) > 59
  ) {
    errorList.push("purchaseTime is incorrect");
  }

  if (!Array.isArray(items)) {
    errorList.push("items array is incorrect");
  }
  items.forEach((item, ind) => {
    const { shortDescription, price } = item;
    // console.log(shortDescription);
    if (
      !shortDescription ||
      !price ||
      !shortDescriptionSyntax.test(shortDescription) ||
      !decimalSyntax.test(price)
    ) {
      errorList.push(`item #${ind} is incorrect`);
    }
  });

  if (!decimalSyntax.test(total)) {
    errorList.push("total syntax is incorrect");
  }

  //   console.log(errorList);
  if (errorList.length > 0) return false;
  return true;
};

module.exports = {
  validateSyntax,
};
