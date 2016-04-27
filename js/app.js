var allProducts = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var displayImage = document.getElementById('image-container');

function ProductInfo(imgFileName) {
  this.imgFileName = 'images/' + imgFileName + '.png';
  this.shown = 0;
  this.clickCount = 0;
}

function createProductInfo(products) {
  var productsObjects = [];
  for (var i = 0; i < products.length; i++) {
    productsObjects.push(new ProductInfo(products[i]));
  };
  return productsObjects;
}

var productInfos = createProductInfo(allProducts);  //Major array

function randomNumber(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomProductInfo() {
  return productInfos[randomNumber(0,productInfos.length - 1)];
}

function generateThreeRandomProducts() {
  displayImage.innerHTML = '';
  // var children = displayImage.children;
  // if(children.length){
  //   console.log('children length', children);
  //   for(var j = 0; j < 3; j++){
  //     children[j].remove();
  //     console.log('removed child', children[j]);
  //   }
  // }
    ///////////////////////

  var threeRandomProducts = [];
  var random1 = randomProductInfo();
  var random2 = randomProductInfo();
  var random3 = randomProductInfo();
  threeRandomProducts.push(random1);
  while (random1 === random2) {
    random2 = randomProductInfo();
  }
  threeRandomProducts.push(random2);
  while (random1 === random3 || random2 === random3) {
    random3 = randomProductInfo();
  }

  threeRandomProducts.push(random3);    //displays 3 images

  for (i = 0; i < 3; i++) {
    // var clearDiv = displayImage.innerhtml;
    // clearDiv = '';
    // displayImage.innerHTML = ' ';
    var imgEl = document.createElement('img');
    imgEl.src = threeRandomProducts[i].imgFileName;
    displayImage.appendChild(imgEl);
    productInfos[i].shown++;
  }
}

function newVoteHandler(event) {
  console.log('click recognized');
  for (var i = 0; i < productInfos.length; i++) {
    if (event.target.id === productInfos[i].imageFileName) {
      productInfos[i].clickCount++;
    }
  }
  generateThreeRandomProducts();
  console.log('one event');
}

generateThreeRandomProducts();

displayImage.addEventListener('click', newVoteHandler);

console.log(productInfos);
