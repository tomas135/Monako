// Lightbox galerie – klik, šipky, klávesnice, swipe
(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  var velkaFotka = document.getElementById("lightbox-foto");
  var pocitadlo = document.getElementById("lightbox-pocitadlo");
  var polozky = Array.prototype.slice.call(document.querySelectorAll(".galerie a"));
  var aktualni = 0;
  var startX = 0;

  function zobraz(index) {
    if (polozky.length === 0) return;
    aktualni = (index + polozky.length) % polozky.length;
    var odkaz = polozky[aktualni];
    velkaFotka.src = odkaz.getAttribute("href");
    velkaFotka.alt = odkaz.querySelector("img").alt;
    pocitadlo.textContent = (aktualni + 1) + " / " + polozky.length;
  }
  function otevri(index) {
    lightbox.classList.add("otevreny");
    document.body.style.overflow = "hidden";
    zobraz(index);
  }
  function zavri() {
    lightbox.classList.remove("otevreny");
    document.body.style.overflow = "";
  }
  polozky.forEach(function (odkaz, i) {
    odkaz.addEventListener("click", function (e) {
      e.preventDefault();
      otevri(i);
    });
  });
  document.getElementById("lightbox-dalsi").addEventListener("click", function (e) {
    e.stopPropagation(); zobraz(aktualni + 1);
  });
  document.getElementById("lightbox-predchozi").addEventListener("click", function (e) {
    e.stopPropagation(); zobraz(aktualni - 1);
  });
  document.getElementById("lightbox-zavrit").addEventListener("click", zavri);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) zavri();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("otevreny")) return;
    if (e.key === "Escape") zavri();
    else if (e.key === "ArrowRight") zobraz(aktualni + 1);
    else if (e.key === "ArrowLeft") zobraz(aktualni - 1);
  });
  // Swipe na mobilu
  velkaFotka.addEventListener("touchstart", function (e) {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });
  velkaFotka.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].screenX - startX;
    if (dx < -40) zobraz(aktualni + 1);
    else if (dx > 40) zobraz(aktualni - 1);
  }, { passive: true });
})();
