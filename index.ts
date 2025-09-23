import express from "express";
import { ConnectToDb } from "./config/db";
const app = express();
const port = 3000;
const bvnRoutes = require("./routes/bvnRoutes")
require("dotenv").config();
app.use(express.json());
ConnectToDb();
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/bvn", bvnRoutes);
// create 3 endpoints for get request
// /about which returns a json of message: "Welcome to about page"
// /home which returns a json of message: "Welcome to home page"
// / which returns a json of message: Hellow roksasda

// app.get("/home/:id/:name", (req, res) => {
//   const { id, name } = req.params;
//   res.json({ message: `Welcome to home page ${id} and of name: ${name}` });
// });
// app.get("/about", (req, res) => {
//   // ?key1=value?key2=value
//   const { category, sortBy } = req.query;

//   // const { id, name } = req.params;
//   // const id = req.params.id;
//   if (category) {
//     res.json({ message: "Returning data for caregory", category });
//   }
//   if (sortBy) {
//     res.json({ message: "Returning data sorted y ", sortBy });
//   } else {
//     res.json({ message: "Welcome to about page" });
//   }
// });

//  creating using post request
// app.post("/about", (req, res) => {
//   const { name, price, size } = req.body;

//   return res.json({
//     name,
//     price,
//     size,
//   });
// });

// update request using put
app.put("/about", (req, res) => {
  const { name, price, size } = req.body;

  return res.json({
    name,
    price,
    size,
  });
});

// delete request using a route parameter
app.delete("/about/:id", (req, res) => {
  const { id } = req.params;

  return res.json({
    message: `deleting product with id: ${id}`,
  });
});
// create endpoints 1 post request, 1 put request and 1 delete request
// /product - post request which recieves a payload of name, price, stock and returns a json of message: "created product succefully" and the name, price and stock

// /product/:id - put request which recieves a payload of name, price, stock in the body and id from the route params and returns a json of message: "updated product succefully" and the name, price and stock and id as well

// /product/:id - delete request which returns a json of message: deleted product and returns the id as well

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
