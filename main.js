let productName = document.getElementById("productName"),
  productPrice = document.getElementById("productPrice"),
  productCategory = document.getElementById("productCategory"),
  productDescription = document.getElementById("productDescription"),
  mainBtn = document.getElementById("mainBtn"),
  productsContainer,
  indexGlobal;

// Check if there is and previous data
if (localStorage.getItem("Product") != null) {
  productsContainer = JSON.parse(localStorage.getItem("Product"));
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}

function addProduct() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };
  if (mainBtn.innerHTML == "add product") {
    productsContainer.push(product);
    localStorage.setItem("Product", JSON.stringify(productsContainer));
    // console.log(product);
    // clearInputs();
    displayProducts(productsContainer);
  } else {
    // update
    productsContainer.splice(indexGlobal, 1, product);
    localStorage.setItem("Product", JSON.stringify(productsContainer));
    mainBtn.innerHTML = "add product";
    displayProducts(productsContainer);
  }
}

function displayProducts(productsList) {
  let product = ``;
  for (let i = 0; i < productsList.length; i++) {
    product += `
    <tr>
      <td>${i}</td>
      <td>${productsList[i].name}</td>
      <td>${productsList[i].price}</td>
      <td>${productsList[i].category}</td>
      <td>${productsList[i].description}</td>
      <td><button onclick="updateProducts(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
    `;
    document.getElementById("tableRow").innerHTML = product;
  }
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1);
  localStorage.setItem("Product", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
}

function searchProducts(keyword) {
  let searchedProducts = [];
  for (let i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(keyword.toLowerCase()) ==
      true
    ) {
      searchedProducts.push(productsContainer[i]);
    }
  }
  displayProducts(searchedProducts);
}

function updateProducts(index) {
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCategory.value = productsContainer[index].category;
  productDescription.value = productsContainer[index].description;

  indexGlobal = index;
  console.log(indexGlobal);
  mainBtn.innerHTML = "Update Product";
}
