if (localStorage.getItem("cartCounter") >= 0) {
    let counter = localStorage.getItem("cartCounter");
    document.getElementById("badge").innerHTML = counter;
  }