document.addEventListener("DOMContentLoaded", function() {

  // Accordion
  document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      document.querySelectorAll(".category-content").forEach(c => { if(c!==content)c.style.maxHeight=null; });
      if(content.style.maxHeight && content.style.maxHeight!=="0px"){
        content.style.maxHeight=null; header.classList.remove("active");
      } else {
        content.style.maxHeight=content.scrollHeight+"px"; header.classList.add("active");
      }
    });
  });

  // Page switching
  document.querySelectorAll(".subBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-target");

      document.querySelectorAll(".page").forEach(p=>p.classList.remove("visible"));
      const targetPage = document.getElementById(id);
      if(targetPage){ 
        targetPage.classList.add("visible"); 
        targetPage.scrollIntoView({behavior:"smooth"}); 
      }

      document.querySelectorAll(".subBtn, .category-header").forEach(el=>el.classList.remove("active"));
      btn.classList.add("active");

      initMapForCategory(id);
    });
  });

  // Maps
  const maps = {};

  function initMapForCategory(categoryId){
    if(maps[categoryId]) return;

    const mapDiv = document.getElementById("map-" + categoryId);
    if(!mapDiv) return;

    const map = L.map(mapDiv).setView([37.055,22.421], 11);
    maps[categoryId] = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:''}).addTo(map);

    let markers = [];

    switch(categoryId){

      // ======================
      // ΠΟΤΑΜΙΑ (με σωστές εικόνες)
      // ======================
      case "rivers":

        // Ευρώτας
        markers.push(L.marker([37.181,22.462]).bindPopup(`
          <div>
            <h3>Ποταμός Ευρώτας</h3>
            <img src="images/Evrotas-River-Greece.jpg" style="width:100%;margin:10px;border-radius:8px;">
            <img src="images/towns-menu.jpg" style="width:100%;margin:10px;border-radius:8px;">
            <p>Ο Ευρώτας είναι ο σημαντικότερος ποταμός της Λακωνίας...</p>
          </div>
        `));

        // Οινούντας
        markers.push(L.marker([37.108,22.433]).bindPopup(`
          <div>
            <h3>Ποταμός Οινούντας</h3>
            <img src="images/οινουντας.jpg" style="width:100%;margin:10px;border-radius:8px;">
            <p>Ο Οινούντας είναι παραπόταμος του Ευρώτα...</p>
          </div>
        `));

        // Σμήνος
        markers.push(L.marker([36.795,22.487]).bindPopup(`
          <div>
            <h3>Ποταμός Σμήνος</h3>
            <img src="images/σμηνος (1).jpg" style="width:100%;margin:10px;border-radius:8px;">
            <img src="images/σμηνος.jpg" style="width:100%;margin:10px;border-radius:8px;">
            <p>Ο Σμήνος είναι ποτάμι στη Λακωνία...</p>
          </div>
        `));

        break;

      // ======================
      // ΟΛΕΣ ΟΙ ΥΠΟΛΟΙΠΕΣ (με default εικόνα)
      // ======================
      default:
        markers.push(L.marker([37.055,22.421]).bindPopup(`
          <div>
            <h3>${categoryId}</h3>
            <img src="images/default.jpg" style="width:100%;margin:10px;border-radius:8px;">
            <p>Βάλε εδώ το δικό σου κείμενο.</p>
          </div>
        `));
        break;
    }

    markers.forEach(m => m.addTo(map));
  }

});
