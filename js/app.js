function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);

  var pageTitle = document.getElementsByTagName("title");
  pageTitle[0].innerText = "Star Wars Spaceship Reference";
  /* console.log(userDatas);
   console.log(szereploTorles(userDatas));
   console.log(arSzerintiRendezes(userDatas));
   nullErtekekModositasa(userDatas);
   console.log(darabszam(userDatas));
   console.log(legnagyobbCargoCapacity(userDatas));
   console.log(osszesUtasszam(userDatas));
   console.log(leghosszabbHajoKepe(userDatas));*/

  //arSzerintiRendezes(userDatas);  
  var rendezes = arSzerintiRendezes(userDatas);

  //szereploTorles(rendezes);
  var torles = szereploTorles(rendezes);

  //nullErtekekModositasa(userDatas);
  var nulla = nullErtekekModositasa(torles);
  console.log(nulla);

  kirajzoltatas(nulla);

  darabszam(nulla);
  legnagyobbCargoCapacity(nulla);
  osszesUtasszam(nulla);
  leghosszabbHajoKepe(nulla);

  alsodiv();

  function alsodiv() {
    var panel2 = document.querySelector('.shapceship-list');
    var alsodiv = document.createElement('DIV');
    alsodiv.setAttribute("class", "also");
    panel2.appendChild(alsodiv);
    var eredmenyek = document.createElement('p');
    alsodiv.appendChild(eredmenyek);

    var alsokep = document.createElement('img');
    alsokep.setAttribute("src", leghosszabbHajoKepe(nulla));
    // alsokep.setAttribute("alt", nulla.model);
    alsodiv.appendChild(alsokep);
    console.log(leghosszabbHajoKepe(nulla));
    console.log(osszesUtasszam(nulla));

    eredmenyek.innerHTML = "Egy fős legénységgel rendelkező hajók darabszáma: " + "<b>" + darabszam(nulla) + "</b>"
      + "<br>" + "A legnagyobb cargo_capacity-vel rendelkező hajó neve (model): " + "<b>" + legnagyobbCargoCapacity(nulla) + "</b>" + "<br>" +
      "Az összes hajó utasainak (passengers) összesített száma: " + "<b>" + osszesUtasszam(nulla) + "</b>" + "<br>" +
      "A leghosszabb hajó: ";
    alsokep.innerHTML = "A leghosszabb(lengthiness) hajó képe: " + leghosszabbHajoKepe(nulla);
  }

  function arSzerintiRendezes(tomb) {
    var i = tomb.length - 1;
    var tmp;
    var swap = false;
    do {
      swap = false;
      for (var j = 0; j < i; j++) {
        if (!parseInt(tomb[j].cost_in_credits)) {
          continue;
        }
        else if (!parseInt(tomb[j + 1].cost_in_credits)) {
          tmp = tomb[j];
          tomb[j] = tomb[j + 1];
          tomb[j + 1] = tmp;
          swap = true;
        }
        else if (parseInt(tomb[j].cost_in_credits) > parseInt(tomb[j + 1].cost_in_credits)) {
          tmp = tomb[j];
          tomb[j] = tomb[j + 1];
          tomb[j + 1] = tmp;
          swap = true;
        }
      }
      i--;
    } while (i >= 0 && swap)
    return tomb;
  }

  var objSearchTextBox = document.querySelector('#search-text');
  var objSearchButton = document.querySelector('#search-button');
  objSearchButton.addEventListener('click', kereses, false);

  function kereses() {
    var filter = objSearchTextBox.value;
    var szoveg = '';
    var talalat = 0;
    console.log(nulla);
    for (var i = 0; i < nulla.length && talalat == 0; i++) {

      if (nulla[i].model.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
        talalat = 1;
        console.log(nulla[i]);
      }
    }
    if (talalat == 0) {
      szoveg = "nincs találat";
      document.querySelector(".one-spaceship").innerHTML = szoveg;
    } else {
      var panel = document.querySelector('.one-spaceship');
      panel.innerText = "";
      kartyak(nulla[i - 1], panel);

    }
  }
}

function szereploTorles(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    if (!parseInt(tomb[i].consumables)) {
      //  if (!tomb[i].consumables) {
      tomb.splice(i, 1);
    }
  }
  return tomb;
}

function nullErtekekModositasa(tomb) {
  for (var i = 0; i < tomb.length; i++) {
    for (var j in tomb[i]) {  //az i-edik elem egy objektum és azt kell bejárnom az i-vel
      if (tomb[i][j] === null) {
        tomb[i][j] = 'unknown';
      }
    }
  }
  return tomb;
}

function darabszam(tomb) {
  var darab = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (parseInt(tomb[i].crew) == 1) {
      darab += 1;
    }
  }
  return darab;
  console.log(darab);
}

function legnagyobbCargoCapacity(tomb) {
  var legnagyobb = tomb[0];
  var index = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (parseInt(tomb[i].cargo_capacity) > parseInt(legnagyobb.cargo_capacity)) {
      legnagyobb = tomb[i];
      index = i;
    }
    var nev = tomb[index].model;
  }
  return nev;
  // return legnagyobb.model;
}

function osszesUtasszam(tomb) {
  var osszesen = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].passengers != "unknown") {
      osszesen = osszesen + parseInt(tomb[i].passengers);
    }
  }
  return osszesen;
}


function leghosszabbHajoKepe(tomb) {
  var leghosszabb = tomb[0];
  var index = 0;
  for (var i = 0; i < tomb.length; i++) {
    if (parseInt(tomb[i].lengthiness) > parseInt(leghosszabb.lengthiness)) {
      leghosszabb = tomb[i];
      index = i;
    }
    var kep = "img/" + tomb[index].image;
    // var kep = "src=img/" + tomb[index].image;
    // var kep = "src=img/" + tomb[index];
  }
  return kep;
  //return leghosszabb.image;
}

function kartyak(obj, elso) {
  var kartya = document.createElement('div');
  kartya.setAttribute("id", obj.id);
  kartya.setAttribute("class", "hajo");
  elso.appendChild(kartya);

  var kep = document.createElement('img');
  kep.setAttribute("src", "/img/" + obj.image);
  kep.setAttribute("alt", obj.model);
  // kep.classList.add('hajokep');
  kartya.appendChild(kep);

  var model = document.createElement('p');
  //model.setAttribute("id", "szereplo-p");
  kartya.appendChild(model);

  model.innerHTML = "<b>" + obj.model + "</b>" + "<br>" + "Consumables: " + obj.consumables + "<br>" + "Denomination: " +
    obj.denomination + "<br>" + "Cargo capacity: " + obj.cargo_capacity + "<br>" + "Passengers: " +
    obj.passengers + "<br>" + "Max athmosphering speed: " + obj.max_athmosphering_speed + "<br>" + "Crew: " + obj.crew +
    "<br>" + "Lengthiness: " + obj.lengthiness + "<br>" + "Cost in credits: " + obj.cost_in_credits + "<br>" +
    "Manufacturer: " + obj.manufacturer;
}

function kirajzoltatas(tomb) {
  var panel = document.querySelector('.shapceship-list');
  for (var i = 0; i < tomb.length; i++) {
    kartyak(tomb[i], panel);
  }
}

getData('/json/spaceships.json', successAjax);