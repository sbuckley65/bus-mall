var allProducts = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

function productInfo(imgFileName) {
  this.imgFileName = imgFileName;
  this.shown = 0;
  this.clickCount = 0;
  this.clicked = function() {
    this.clickCount++;
  };
}

function createProductInfo(products) {
  var productsObjects = [];
  for (var i = 0; i < products.length; i++) {
    productsObjects.push(new productInfo(products[i]));
  };
  return productsObjects;
}

var productInfos = createProductInfo(allProducts);  //Major array
console.log(productInfos);

function randomNumber(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomProductInfo() {
  return productInfos[randomNumber(0,productInfos.length - 1)];
}

function onClick(product) {
  product.clicked();
  console.log(productInfos);
//  generateThreeRandomProducts();
}

function generateThreeRandomProducts() {
  var threeRandomProducts = [];
  var finalImageLink = '';
  for (var i = 0; i < 3; i++) {
    var displayImage = document.getElementById('image-container');
    var product = randomProductInfo();
    console.log(product);
    finalImageLink = finalImageLink + '<img id="' + product.imgFileName + '" src="images/' + product.imgFileName + '.png" />';
    product.shown++;
    threeRandomProducts.push(product);
  }
  displayImage.innerHTML = finalImageLink;
  for (var i = 0; i < 3; i++) {
    var imgEl = document.getElementById(threeRandomProducts[i].imgFileName);
    imgEl.addEventListener('click', onClick(threeRandomProducts[i]));
  }

}

generateThreeRandomProducts();
alert('foo');
console.log(productInfos);
