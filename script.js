document.addEventListener("DOMContentLoaded", function () {

  // Incarcam fisierul JSON cu fetch()
  fetch("data/resources.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var resurse = data.resources;

      // 1. Afisam TOATE resursele
      afiseazaResurse(resurse);

      // 2. Filtram doar locurile de studiu (tag "studiu")
      var locuriStudiu = resurse.filter(function (resursa) {
        return resursa.tags.includes("studiu");
      });
      afiseazaFiltrate(locuriStudiu);

      // 3. Cream cloud-ul de tag-uri (categorii unice)
      var toateTags = resurse.flatMap(function (resursa) {
        return resursa.tags;
      });
      var tagsUnice = new Set(toateTags);
      afiseazaTags(tagsUnice, resurse);
    })
    .catch(function (eroare) {
      console.log("Eroare la incarcare JSON: " + eroare);
    });
});

// Afiseaza toate resursele in lista
function afiseazaResurse(resurse) {
  var container = document.getElementById("lista-resurse");
  if (!container) return;

  container.innerHTML = "";

  resurse.forEach(function (resursa) {
    var card = creeazaCard(resursa);
    container.appendChild(card);
  });
}

// Afiseaza doar resursele filtrate (studiu)
function afiseazaFiltrate(resurse) {
  var container = document.getElementById("lista-studiu");
  if (!container) return;

  container.innerHTML = "";

  resurse.forEach(function (resursa) {
    var card = creeazaCard(resursa);
    container.appendChild(card);
  });
}

// Creeaza un element card pentru o resursa
function creeazaCard(resursa) {
  var card = document.createElement("div");
  card.className = "card";

  var titlu = document.createElement("h3");
  titlu.textContent = resursa.name;

  var tip = document.createElement("span");
  tip.className = "tip tip-" + resursa.type;
  tip.textContent = resursa.type;

  var locatie = document.createElement("p");
  locatie.textContent = "📍 " + resursa.location;

  var descriere = document.createElement("p");
  descriere.className = "descriere";
  descriere.textContent = resursa.description;

  var program = document.createElement("p");
  program.className = "program";
  program.textContent = "🕐 Luni-Vineri: " + resursa.program.luni_vineri;

  var taguri = document.createElement("div");
  taguri.className = "taguri";

  resursa.tags.forEach(function (tag) {
    var span = document.createElement("span");
    span.className = "tag";
    span.textContent = "#" + tag;
    taguri.appendChild(span);
  });

  card.appendChild(tip);
  card.appendChild(titlu);
  card.appendChild(locatie);
  card.appendChild(descriere);
  card.appendChild(program);
  card.appendChild(taguri);

  return card;
}

// Afiseaza cloud-ul de tag-uri cu filtrare la click
function afiseazaTags(tagsUnice, toateResursele) {
  var container = document.getElementById("cloud-taguri");
  if (!container) return;

  container.innerHTML = "";

  tagsUnice.forEach(function (tag) {
    var btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.textContent = "#" + tag;

    // La click, filtram resursele dupa tag
    btn.addEventListener("click", function () {
      var filtrate = toateResursele.filter(function (resursa) {
        return resursa.tags.includes(tag);
      });

      var container = document.getElementById("lista-resurse");
      container.innerHTML = "";

      var info = document.createElement("p");
      info.className = "info-filtrare";
      info.textContent = "Filtrare dupa: #" + tag + " — " + filtrate.length + " rezultate";
      container.appendChild(info);

      filtrate.forEach(function (resursa) {
        container.appendChild(creeazaCard(resursa));
      });
    });

    container.appendChild(btn);
  });

  // Buton reset
  var resetBtn = document.createElement("button");
  resetBtn.className = "tag-btn reset";
  resetBtn.textContent = "✕ Arata toate";
  resetBtn.addEventListener("click", function () {
    fetch("data/resources.json")
      .then(function (r) { return r.json(); })
      .then(function (data) { afiseazaResurse(data.resources); })
      .catch(function (e) { console.log(e); });
  });
  container.appendChild(resetBtn);
}