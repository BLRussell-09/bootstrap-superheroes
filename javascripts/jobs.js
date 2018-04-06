console.log('Yo!')

let selectedHero = "";
// Print to Dom and Dom String Builder

function printToDom(domString, divId) {
  document.getElementById(divId).innerHTML += domString;
}

const buildDomString = (heroesArray) => {
  let domString = ''
  heroesArray.forEach(element => {
    domString += `<li>`
    domString += `<a class="hero" href="#" data-hero-id="${element.id}">${element.name}</a>`;
    domString += `</li>`
  });
  printToDom(domString, "super-drop")
};

const showHeroes = (heroesArray) => {
  let domString = ''
  heroesArray.forEach(element => {
    if (element.id === selectedHero) {
      domString += `<div class="row">`;
      domString += `<div class="col-sm-4">`;
      if (element.gender === "Male") 
      {
        domString += `<img class="charImage green" src="${element.image}">`;
      } 
      else 
      {
        domString += `<img class="charImage pink" src="${element.image}">`;
      }
      domString += `</div>`;
      domString += `<div class="col-sm-6">`;
      domString += `<h2>Selected Hero: ${element.name}</h2>`;
      domString += `<p class='charDescription'>${element.description}</p>`;
      domString += `</div>`;
    }
  });
  printToDom(domString, "singleHero");
  getJobs(heroesArray)
};


function megaSmash(jobsArr, heroArr){
  heroArr.forEach(hero => {
    hero.jobs = [];
    // console.log(hero.jobs)
    hero.jobIds.forEach(jobId => {
      jobsArr.forEach(job => {
        if (job.id === jobId){
          hero.jobs.push(job.title)
        }
      })
    })
  })  
  return heroArr;
}

const displayJobs = (heroArr) => {
  let domString = '';
  heroArr.forEach(hero => {
    console.log(hero);
    if(hero.id === selectedHero){
      hero.jobs.forEach(job => {
        domString += `<div class="well col-md-3">${job}</div>`;
      })
    } else {
      console.log(" you failed")
    }
  });
  printToDom(domString,"jobs");
}

// Event Listeners

const selectHero = (e) => {
  selectedHero =  e.target.dataset.heroId;
  document.getElementById('super-drop').classList.add('hide');
  genericHeroRequest(singleHero);
}

const addheroSelectionEventListener = () => {
  const heroButton = document.getElementsByClassName("hero")
  for (let idx = 0; idx < heroButton.length; idx++)
  {
    heroButton[idx].addEventListener("click", selectHero)
  }
}

// XHR REquest
function iFail() {
  console.log('I effed up.');
}

function loadMe() {
  const data = JSON.parse(this.responseText);
  buildDomString(data.superheroes);
  addheroSelectionEventListener();
}

function singleHero() {
  const data = JSON.parse(this.responseText);
  showHeroes(data.superheroes);
}

const getJobs = (heroesArray) => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", jobsJson);
  myRequest.addEventListener("error", iFail);
  myRequest.open("GET", "../db/jobs.json");
  myRequest.send();

  function jobsJson() {
    const jobs = JSON.parse(this.responseText).jobs;
    const completeHeroes = megaSmash(jobs, heroesArray);
    displayJobs(completeHeroes);
  }
}

const genericHeroRequest = (successfunction) => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", successfunction);
  myRequest.addEventListener("error", iFail);
  myRequest.open("GET", "../db/superheroes.json");
  myRequest.send();
}

function startApp() {
  genericHeroRequest(loadMe);
};

startApp()