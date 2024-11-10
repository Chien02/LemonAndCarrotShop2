// Fetch the product data from the JSON file
async function fetchProducts() {
  try {
    const response = await fetch("/oct.cloveraccessory/jsons/product.json");
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
        <div class = "card shadow" style = "width: 16rem; height: 21rem">
          <a href=${productID} class="text-decoration-none rounded">
            <img class="card-img-top img-fluid rounded mx-auto" src="${product.preview}" alt="${product.name}">
            <div class="card-body">
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">${product.description}</p>
                <h5 class="card-text" id="productPrice">Price: $${product.price.toFixed(2)}</h5>
            </div>
          </a>
        </div>
        `;
        
        productList.appendChild(productElement);
    });
}
        
        
// Fetch and render the products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);