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

app.get("/api/products", async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/api/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/api/products", async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.put("/api/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.delete("/api/products/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json({ message: "Product deleted successfully" });
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
