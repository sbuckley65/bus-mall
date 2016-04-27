var allProducts = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var displayImage = document.getElementById('image-container');
var giveMore = document.getElementById('give-more');
var summary = document.getElementById('summary');
var loopCount = 5;

function ProductInfo(imgFileName) {
  this.name = imgFileName;
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
    var imgEl = document.createElement('img');
    imgEl.src = threeRandomProducts[i].imgFileName;
    imgEl.id = threeRandomProducts[i].name;
    displayImage.appendChild(imgEl);
    threeRandomProducts[i].shown++;
  }
}

function newVoteHandler(event) {
  console.log('id is' + event.target.id);
  loopCount--;
  if (loopCount === 0) {
    console.log('show buttons to get a new target id');
  } else if (event.target.id === giveMore.id) {
    loopCount = 2;
    console.log('looping 10 more times');
    generateThreeRandomProducts();
  } else if (event.target.id === summary.id) {
    console.log('showing summary');
  } else {
    console.log('show images and process clicks');
    console.log('target id = ' + event.target.id);
    for (var i = 0; i < productInfos.length; i++) {
      if (event.target.id === productInfos[i].name) {
        productInfos[i].clickCount++;
      }
    }
    generateThreeRandomProducts();
  }
  console.table(productInfos);
  console.log('one event');
}

generateThreeRandomProducts();

displayImage.addEventListener('click', newVoteHandler);

function createButtons() {
  giveMore.addEventListener('click', newVoteHandler);
  summary.addEventListener('click', newVoteHandler);
}
