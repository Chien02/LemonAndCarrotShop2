// Fetch the product data from the JSON file
async function fetchProducts() {
  try {
    const response = await fetch("./jsons/product.json");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Render the products in the HTML
function renderProducts(products) {
    const productList = document.getElementById("clothContainer");  
    // productList.innerHTML = ""; // Clear existing content
    
    products.forEach((product) => {
        const productElement = document.createElement("div");
        const productID = "contentDetail.html?id=" + product.id;
        productElement.className = 'col-lg-3 col-md-6 col-12 d-flex align-items-stretch justify-content-around';
        
        productElement.innerHTML = `
        <a href=${productID} class="text-decoration-none rounded">
          <div class = "card shadow" style = "width: 16rem; height: 21rem">
            <img class="card-img-top img-fluid rounded mx-auto" src="${product.preview}" alt="${product.name}">
            <div class="card-body d-flex flex-column justify-content-between">
                <h4 class="card-title mt-0">${product.name}</h4>
                <h5 class="card-text mt-auto" id="productPrice">Price: $${product.price.toFixed(2)}</h5>
            </div>
            </div>
          </a>
        `;
        
        productList.appendChild(productElement);
    });
}
        
        
// Fetch and render the products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);