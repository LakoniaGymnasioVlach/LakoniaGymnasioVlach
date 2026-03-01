document.addEventListener("DOMContentLoaded", function() {

  // ====== Accordion ======
  document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      document.querySelectorAll(".category-content").forEach(c => {
        if (c !== content) c.style.maxHeight = null;
      });

      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = null;
        header.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        header.classList.add("active");
      }
    });
  });

  // ====== Page switching ======
  document.querySelectorAll(".subBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");

      document.querySelectorAll(".page").forEach(p => 
        p.classList.remove("visible")
      );

      const targetPage = document.getElementById(id);
      if (targetPage) {
        targetPage.classList.add("visible");
        targetPage.scrollIntoView({ behavior: "smooth" });
      }

      document.querySelectorAll(".subBtn, .category-header").forEach(el =>
        el.classList.remove("active")
      );

      btn.classList.add("active");

      // Αν είναι rivers, φορτώνει map
      if (id === "rivers") setTimeout(initMap, 200);
    });
  });

  // ====== Leaflet Map ======
  let mapInitialized = false;

  function initMap() {
    if (mapInitialized) return;

    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    const map = L.map('map').setView([37.055, 22.421], 11);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '' }
    ).addTo(map);

    // Popup με εικόνες
    L.marker([37.055, 22.421])
      .addTo(map)
      .bindPopup(`<b>Ποταμός Ευρώτας</b><br>
      <img src="Evrotas-River-Greece.jpg" alt="Ευρώτας" style="width:100%;margin-top:10px;border-radius:8px;"><br>
      <img src="towns-menu.jpg" alt="Κοντινές πόλεις" style="width:100%;margin-top:10px;border-radius:8px;"><br>
      Ο Ευρώτας είναι ο σημαντικότερος ποταμός της Λακωνίας, με γύρω
στα 82 χλμ. μήκος και πηγές στις νότιες πλαγιές του Ταΰγετου, που
διασχίζει την πεδιάδα της Λακωνίας ως τον Λακωνικό Κόλπο.
Στην αρχαιότητα συνδέθηκε με τη Σπάρτη, καθώς το ποτάμι και η
κοιλάδα του υπήρξαν ζωτικής σημασίας για την αγροτική ανάπτυξη και
την ιστορική ζωή της περιοχής.
Η κοιλάδα του Ευρώτα υπήρξε κατοικημένη από τη νεολιθική εποχή και
αποτελεί πυρήνα πολιτισμού και γεωργίας από χιλιετίες.
Οι όχθες του φιλοξενούν σημαντικούς υγροτόπους και οικοσυστήματα
που προσελκύουν πλούσια πανίδα, ειδικά πουλιά κατά τη
μετανάστευση.`);

    mapInitialized = true;
  }

});