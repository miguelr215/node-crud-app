const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();
const PORT = 3000;

// middleware that is required to convert json to JS object
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/api/products", async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

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
