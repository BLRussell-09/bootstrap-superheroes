console.log('Yo!')

// Print to Dom and Dom String Builder

function printToDom(domString, divId) {
  document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (heroesArray) => {
  let domString = ''
  for (let idx = 0; idx < heroesArray.length; idx++)
  {
    domString += `<div class="col-md-3">`
    domString += `<div class="panel">`;
    domString += `<div class="panel-heading">`;
    domString += `<h3 class="panel-title">${heroesArray[idx].name}</h3>`;
    domString += `</div>`;
    domString += `<div class="panel-body">`;
    if (heroesArray[idx].gender === "Female") {
      domString += `<img class="img-circle pink  "src="${heroesArray[idx].image}">`;
    }
    else {
      domString += `<img class="img-circle green  "src="${heroesArray[idx].image}">`;
    }
    domString += `<p class="charDesc">${heroesArray[idx].description}`
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  }
  printToDom(domString, "hero-container")
};

// XHR REquest
function iFail() {
  console.log('I effed up.');
}

function loadMe() {
  const data = JSON.parse(this.responseText);
  buildDomString(data.superheroes);
}

function startApp() {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", loadMe);
  myRequest.addEventListener("error", iFail)
  myRequest.open("GET", "/db/superheroes.json")
  myRequest.send();
}

startApp()
