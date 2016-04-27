var allProducts = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var displayImage = document.getElementById('image-container');
var displayButtons = document.getElementById('button-container');
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
  console.log('id is ' + event.target.id);
  loopCount--;
  if (loopCount === 0) {
    createButtons();
    console.log('show buttons to get a new target id');
  } else if (event.target.id === 'give-more') {
    loopCount = 2;
    console.log('looping 10 more times');
    displayButtons.innerHTML = '';
    generateThreeRandomProducts();
  } else if (event.target.id === 'summary') {
    console.log('showing summary');
    displayButtons.innerHTML = '';// remove buttons
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

function createButtons() {
  console.log('create buttons');
  displayImage.innerHTML = ''; // remove pictures
  var buttonElOne = document.createElement('button');
  var buttonElTwo = document.createElement('button');
  buttonElOne.id = 'give-more';  //returning IDs to newVoteHandler
  buttonElTwo.id = 'summary';
  var text1 = document.createTextNode('Give me more!');
  var text2 = document.createTextNode('Summary');
  buttonElOne.appendChild(text1);
  buttonElTwo.appendChild(text2);
  displayButtons.appendChild(buttonElOne);
  displayButtons.appendChild(buttonElTwo);
  displayButtons.addEventListener('click', newVoteHandler);
}

generateThreeRandomProducts();

displayImage.addEventListener('click', newVoteHandler);
