const Product = require("../models/product");

//this is a test method  to test everything before it is implemented in the G method
const getAllProductsStatic = async (req, res) => {
  const search = "tab";
  const products = await Product.find({
    // here pick only one while comment the others cause each one is for diff purpose
    //name: { $regex: search, $options: "i" }, // this is for searching by letters included in a name needed (similar to LIKE clause in SQL))  //$options: "i" for case insensitive
    //page: 2,  // to search for exact page tho not implemented yet however it still does not break anything and it returns nothing
    //name: "simple chair", // to search for exact name
  })
    .sort("-name price")
    .select("name price") //this .sort(" "); can be removed
    .limit(3) //limiting the projection to a specific value
    .skip(20); //skipping first x amount so if we have 23 items, with this we only gonna see last 3 items cause we skipped 20 already

  res.status(200).json({ products, amount: products.length });
  //throw new Error("testing async errors");
  //res.status(200).json({ msg: "products testing route" });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  console.log(queryObject);
  //const products = await Product.find(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    console.log(
      `sort query before removing its comma and adding space : ${sort}  ...`
    );
    const sortList = sort.split(",").join(" "); // in case we have in URL: ?sort=name,-prince so instead of becoming "name,-prince" inside the sort, it becomes : "name -prince" which is the correct syntax
    console.log(`sort query after : ${sortList}  ...`);
    result = result.sort(sortList);
  } else {
    //incase the user did not enter a value for sort, then its sorted by date of creation
    result = result.sort("createdAt");
  }
  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }
  //pagination
  //here i did not destruct the req.query to get page + limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, amount: products.length });
  //res.status(200).json({ msg: "products route" });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
