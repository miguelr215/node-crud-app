const prodList = document.getElementById("productsList");

const getProducts = async () => {
	try {
		const res = await fetch("http://localhost:3000/api/products");
		const data = await res.json();
		console.log("data from script: ", data);

		let htmlContent = "";
		data.forEach((product) => {
			htmlContent += `
			<li>
			<h3>${product.name}</h3>
			<p>Inventory: ${product.quantity}</p>
			<p>Price: $${product.price}</p>
			<button type="button" onclick="deleteProd('${product._id}')">Delete</button>
			</li>
			`;
		});
		console.log("htmlContent: ", htmlContent);
		prodList.innerHTML = htmlContent;
	} catch (error) {
		console.log("error getting products from API:", error.message);
	}
};

const deleteProd = async (id) => {
	console.log("deleted id: ", id);
	try {
		const deletedProduct = await fetch(
			`http://localhost:3000/api/products/${id}`,
			{
				method: "DELETE",
			}
		);

		if (deletedProduct.ok) {
			alert("product successfully deleted");
			// refresh the list after successful deletion
			getProducts();
		} else {
			throw new Error("Failed to delete product");
		}
	} catch (error) {
		console.log("error deleting product from API: ", error.message);
	}
};
