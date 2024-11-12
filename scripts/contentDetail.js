console.clear();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Product ID:", id);

// Update cart badge from `localStorage`
function updateCartBadge() {
  const counter = localStorage.getItem("cartCounter") || "0";
  document.getElementById("badge").innerHTML = counter;
}
updateCartBadge();

function dynamicContentDetails(ob) {
  let mainContainer = document.createElement("div");
  mainContainer.id = "containerD";
  document.getElementById("containerProduct").appendChild(mainContainer);

  let imageSectionDiv = document.createElement("div");
  imageSectionDiv.id = "imageSection";

  let imgTag = document.createElement("img");
  imgTag.id = "imgDetails";
  imgTag.src = ob.preview;

  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.id = "productDetails";

  let h1 = document.createElement("h1");
  let h1Text = document.createTextNode(ob.name);
  h1.appendChild(h1Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3DetailsDiv = document.createElement("h3");
  let h3DetailsText = document.createTextNode("Rs " + ob.price);
  h3DetailsDiv.appendChild(h3DetailsText);

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode("Description");
  h3.appendChild(h3Text);

  let para = document.createElement("p");
  let paraText = document.createTextNode(ob.description);
  para.appendChild(paraText);

  let productPreviewDiv = document.createElement("div");
  productPreviewDiv.id = "productPreview";

  let h3ProductPreviewDiv = document.createElement("h3");
  let h3ProductPreviewText = document.createTextNode("Product Preview");
  h3ProductPreviewDiv.appendChild(h3ProductPreviewText);
  productPreviewDiv.appendChild(h3ProductPreviewDiv);

  // Product Preview Images
  for (let i = 0; i < ob.photos.length; i++) {
    let imgTagProductPreviewDiv = document.createElement("img");
    imgTagProductPreviewDiv.id = "previewImg";
    imgTagProductPreviewDiv.src = ob.photos[i];
    imgTagProductPreviewDiv.onclick = function () {
      imgTag.src = this.src;
    };
    productPreviewDiv.appendChild(imgTagProductPreviewDiv);
  }

  // Add to Cart Button
  let buttonDiv = document.createElement("div");
  buttonDiv.id = "button";

  let buttonTag = document.createElement("button");
  buttonTag.appendChild(document.createTextNode("Add to Cart"));
  buttonTag.onclick = function () {
    // Retrieve current cart order list and counter
    let cartCounter = Number(localStorage.getItem("cartCounter") || "0");
    let orderList = JSON.parse(localStorage.getItem("orderList") || "[]");

    // Increment the cart counter and add product ID to order list
    cartCounter += 1;
    orderList.push(id);

    // Update `localStorage` with the new values
    localStorage.setItem("cartCounter", cartCounter);
    localStorage.setItem("orderList", JSON.stringify(orderList));

    // Update the cart badge
    updateCartBadge();

    console.log("Cart Counter:", cartCounter);
    console.log("Order List:", orderList);
  };

  buttonDiv.appendChild(buttonTag);

  // Appending all elements to the main container
  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  productDetailsDiv.appendChild(productPreviewDiv);
  productDetailsDiv.appendChild(buttonDiv);

  return mainContainer;
}

// Example Data Fetch Function (you can adjust this for your backend)
fetch("./jsons/product.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Product Data:", data);
    const product = data.find((item) => {
        console.log(item);
        return item.id == id;
    });
    if (product) {
      dynamicContentDetails(product);
    } else {
      console.error("Product not found for ID:", id);
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
