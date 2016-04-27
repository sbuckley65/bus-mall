var allProducts = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var displayImage = document.getElementById('image-container');
var displayButtons = document.getElementById('button-container');
var loopCount = 5;
var chartVotes = []; //creating array of votes for chart
var chartTitles = []; //creating array of titles for chart
var voteChart;        //
var chartDrawn = false;

function ProductInfo(zippy) {
  this.zoon = zippy;
  this.imgFileName = 'images/' + zippy + '.png';
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
  threeRandomProducts.push(random3);

  for (i = 0; i < 3; i++) {

    var imgEl = document.createElement('img');   //displays 3 images
    imgEl.src = threeRandomProducts[i].imgFileName;
    imgEl.id = threeRandomProducts[i].zoon;
    displayImage.appendChild(imgEl);
    threeRandomProducts[i].shown++;
  }
}

function newVoteHandler(event) {
  // console.log('id is ' + event.target.id);
  loopCount--;
  if (loopCount === 0) {
    createButtons();
    for (var i = 0; i < productInfos.length; i++) {
      if (event.target.id === productInfos[i].zoon) {
        productInfos[i].clickCount++;
        console.log('counted click');
        updateVotesBarChartArrays();    //updating chart array with vote count
      }
    }
  } else if (event.target.id === 'moreVotes') {
    loopCount = 2;
    // console.log('looping 10 more times');
    displayButtons.innerHTML = '';
    generateThreeRandomProducts();
  } else if (event.target.id === 'chartButton') {
    // console.log('showing summary');                //calling drawChart
    displayButtons.innerHTML = '';// remove buttons
  } else {
    // console.log('show images and process clicks');
    // console.log('target id = ' + event.target.id);
    for (var i = 0; i < productInfos.length; i++) {
      if (event.target.id === productInfos[i].zoon) {
        productInfos[i].clickCount++;
        console.log('counted click');
        updateVotesBarChartArrays();    //updating chart array with vote count
      }
    }
    generateThreeRandomProducts();
  }
  // console.table(productInfos);
  // console.log('one event');
}

function createButtons() {
  // console.log('create buttons');
  displayImage.innerHTML = ''; // remove pictures
  var buttonElOne = document.createElement('button');
  var buttonElTwo = document.createElement('button');
  buttonElOne.id = 'moreVotes';  //returning IDs to newVoteHandler
  buttonElTwo.id = 'chartButton';
  var text1 = document.createTextNode('Give me more!');
  var text2 = document.createTextNode('Summary');
  buttonElOne.appendChild(text1);
  buttonElTwo.appendChild(text2);
  displayButtons.appendChild(buttonElOne);
  displayButtons.appendChild(buttonElTwo);
  buttonElOne.addEventListener('click', newVoteHandler);
  buttonElTwo.addEventListener('click', drawChart);
}

function updateVotesBarChartArrays() {
  for (var i = 0; i < productInfos.length; i++){
    chartVotes[i] = productInfos[i].clickCount;
    chartTitles[i] = productInfos[i].zoon;
  }
};

var data = {
  labels: chartTitles,
  datasets: [
    {
      label: 'Bus Mall Product Game Results',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ]
};

function drawChart() {
  var ctx = document.getElementById('bus-chart').getContext('2d');
  var votesBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    // options: options
  });
  console.log('draw chart');
}

generateThreeRandomProducts();

displayImage.addEventListener('click', newVoteHandler);
var summaryButton = document.getElementById('chartButton');
// summaryButton.addEventListener('click', showSummary);

function showSummary() {
  drawChart();
  console.log('summary button clicked');
}
