console.clear();
async function fetchProducts() {
    try {
      const response = await fetch("./jsons/product.json");
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }


if (localStorage.getItem("cartCounter") >= 0) {
  let counter = localStorage.getItem("cartCounter");
  document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById("cartContainer");

let boxContainerDiv = document.createElement("div");
boxContainerDiv.id = "boxContainer";

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter) {

  buttonLink.appendChild(buttonText);
  cartContainer.appendChild(boxContainerDiv);
  cartContainer.appendChild(totalContainerDiv);
  let cartMain = document.getElementById("cartMainContainer");
  cartMain.appendChild(totalContainerDiv);

  const cardDiv = document.createElement("div");
  cardDiv.className = "card container shadow p-2 m-1";
  let cardElements = `
    <div class="row g-0" style="height: 124px">
      <div class="col-md-4">
        <img src="${ob.preview}" class="img-fluid rounded" style="height: 124px">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${ob.name}</h5>
          <p class="card-text">Price: ${ob.price} Amount: ${itemCounter}</p>
        </div>
      </div>
    </div>
  `;
  cardDiv.innerHTML = cardElements;
  cartContainer.appendChild(cardDiv)
  return cartContainer;
}

let totalContainerDiv = document.createElement("div");
totalContainerDiv.id = "totalContainer";
totalContainerDiv.className = "card container w-50 h-100 m-2 p-2 text-center";

let totalDiv = document.createElement("div");
totalDiv.id = "total";
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement("h2");
let h2Text = document.createTextNode("TOTAL AMOUNT:");
totalh2.appendChild(h2Text);
totalh2.className = "p-2 m-2"
totalh2.style = "color: #F5F5F5";
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
  let totalh4 = document.createElement("h4");
  totalh4.style = "color: #FFAD42";
  // let totalh4Text = document.createTextNode(amount)
  let totalh4Text = document.createTextNode("AMOUNT: PRICE " + amount);
  totalh4Text.id = "toth4";
  totalh4.appendChild(totalh4Text);
  totalDiv.appendChild(totalh4);
  totalDiv.appendChild(buttonDiv);
  console.log(totalh4);
}

let buttonDiv = document.createElement("div");
buttonDiv.id = "buttonDiv"
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement("button");
buttonTag.id = "orderButton"
buttonTag.className = "rounded"
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement("a");
buttonLink.className = "text-decoration-none p-2 m-2 mx-auto"
buttonLink.href = "orderPlace.html?";
buttonTag.appendChild(buttonLink);

buttonText = document.createTextNode("PLACE ORDER");
buttonTag.onclick = function () {
  console.log("clicked");
};
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL

function renderProducts(products) {
let totalAmount = 0;
    if (products) {
      // console.log('call successful');
      contentTitle = products;

      let counter = Number(localStorage.getItem("cartCounter") || "0");
      document.getElementById("totalItem").innerHTML = "Total Items: " + counter;

      let item = JSON.parse(localStorage.getItem("orderList") || "[]");
      console.log(counter);
      console.log(item);
      console.log(item[0]);

      let i;
      let totalAmount = 0;
      for (i = 0; i < counter; i++) {
        let itemCounter = 1;
        for (let j = i + 1; j < counter; j++) {
          if (Number(item[j]) == Number(item[i])) {
            console.log(item[i]);
            itemCounter += 1;
          }
        }
        totalAmount += Number.parseInt(contentTitle[item[i] - 1].price) * itemCounter;
        dynamicCartSection(contentTitle[item[i] - 1], itemCounter);
        i += itemCounter - 1;
      }
      amountUpdate(totalAmount);
    }
    else {
        console.log("call failed!");
    }
}

// Fetch and render the products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);
