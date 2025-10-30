const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const cors = require("cors");
const productRoutes = require("./routes/product.routes.js");

// middleware that is required to convert json to JS object
app.use(express.json());
// middleware for form URL encoded data
app.use(express.urlencoded({ extended: false }));
// middleware for CORS
app.use(cors());

// routes
app.use("/api/products", productRoutes);

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

mongoose
	.connect(
		"mongodb+srv://miguel_db_admin:emwGcI3kcWJ0FjXH@nodeapi.idkgzqr.mongodb.net/?appName=NodeAPI"
	)
	.then(() => {
		console.log("Connected to database!");

		app.listen(PORT, () => {
			console.log(
				`Server is running on port ${PORT} ---> http://localhost:${PORT}/`
			);
		});
	})
	.catch(() => {
		console.log("DB connection failed");
	});
