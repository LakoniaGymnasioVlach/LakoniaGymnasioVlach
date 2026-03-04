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

  // Leaflet Maps για κάθε κατηγορία
  const maps = {}; // Αποθήκευση map objects
  function initMapForCategory(categoryId){
    if(maps[categoryId]) return; // Αν έχει ήδη δημιουργηθεί

    const mapDiv = document.getElementById("map-" + categoryId);
    if(!mapDiv) return;

    const map = L.map(mapDiv).setView([37.055,22.421], 11);
    maps[categoryId] = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:''}).addTo(map);

    // Placeholder markers array
    let markers = [];

    // =======================
    // ΔΥΝΑΤΟΤΗΤΑ ΝΑ ΠΡΟΣΘΕΣΕΙΣ ΚΕΙΜΕΝΑ ΚΑΙ ΦΩΤΟΓΡΑΦΙΕΣ
    // =======================
    // Απλώς άλλαξε το HTML μέσα στο bindPopup
    // πχ <img src="images/example.jpg"> ή <p>Κείμενο...</p>
    // =======================

    switch(categoryId){
      // Υλική Πολιτιστική Κληρονομιά
      case "ancient":
        markers.push(L.marker([37.143,22.396]).bindPopup(`
          <div>
            <h3>Αρχαία Μνημεία</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Γράψε εδώ το κείμενο για το μνημείο.</p>
          </div>
        `));
        break;
      case "churches":
        markers.push(L.marker([37.150,22.430]).bindPopup(`
          <div>
            <h3>Εκκλησίες</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για εκκλησίες.</p>
          </div>
        `));
        break;
      case "castles":
        markers.push(L.marker([37.160,22.420]).bindPopup(`
          <div>
            <h3>Κάστρα</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για κάστρα.</p>
          </div>
        `));
        break;

      // Άυλη Πολιτιστική Κληρονομιά
      case "recipes":
        markers.push(L.marker([37.140,22.410]).bindPopup(`
          <div>
            <h3>Συνταγές</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για συνταγές.</p>
          </div>
        `));
        break;
      case "products":
        markers.push(L.marker([37.135,22.400]).bindPopup(`
          <div>
            <h3>Προϊόντα</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για προϊόντα.</p>
          </div>
        `));
        break;
      case "costumes":
        markers.push(L.marker([37.145,22.415]).bindPopup(`
          <div>
            <h3>Φορεσιές</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για φορεσιές.</p>
          </div>
        `));
        break;
      case "dances":
        markers.push(L.marker([37.138,22.425]).bindPopup(`
          <div>
            <h3>Χοροί</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για χορούς.</p>
          </div>
        `));
        break;
      case "songs":
        markers.push(L.marker([37.142,22.418]).bindPopup(`
          <div>
            <h3>Τραγούδια</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για τραγούδια.</p>
          </div>
        `));
        break;
      case "weaving":
        markers.push(L.marker([37.137,22.422]).bindPopup(`
          <div>
            <h3>Υφαντική Τέχνη</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για υφαντική τέχνη.</p>
          </div>
        `));
        break;
      case "legends":
        markers.push(L.marker([37.139,22.412]).bindPopup(`
          <div>
            <h3>Θρύλοι</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για θρύλους.</p>
          </div>
        `));
        break;

      // Γεωφυσική Κληρονομιά
      case "rivers":
        markers.push(L.marker([37.181,22.462]).bindPopup(`
          <div>
            <h3>Ποταμός Ευρώτας</h3>
            <img src="" alt="Evrotas-River-Greece" style="width:100%;margin:10px;border-radius:8px;">
            <img src="" alt="towns-menu" style="width:100%;margin:10px;border-radius:8px;">
           <p>Ο Ευρώτας είναι ο σημαντικότερος ποταμός της Λακωνίας, με γύρω
στα 82 χλμ. μήκος και πηγές στις νότιες πλαγιές του Ταΰγετου, που
διασχίζει την πεδιάδα της Λακωνίας ως τον Λακωνικό Κόλπο.
Στην αρχαιότητα συνδέθηκε με τη Σπάρτη, καθώς το ποτάμι και η
κοιλάδα του υπήρξαν ζωτικής σημασίας για την αγροτική ανάπτυξη και
την ιστορική ζωή της περιοχής.
Η κοιλάδα του Ευρώτα υπήρξε κατοικημένη από τη νεολιθική εποχή και
αποτελεί πυρήνα πολιτισμού και γεωργίας από χιλιετίες.
Οι όχθες του φιλοξενούν σημαντικούς υγροτόπους και οικοσυστήματα
που προσελκύουν πλούσια πανίδα, ειδικά πουλιά κατά τη
μετανάστευση.</p>
          </div>
        `));
        
        markers.push(L.marker([37.108,22.433]).bindPopup(`
          <div>
            <h3>Ποταμός Οινούντας</h3>
            <img src="" alt="οινουντας" style="width:100%;margin:10px;border-radius:8px;">
            <p>Ο Οινούντας, επίσης γνωστός στην περιοχή και ως Κελεφίνα,
είναι παραπόταμος του Ευρώτα που ρέει από τις πλαγιές του
Πάρνωνα και ενώνεται με τον κύριο ποταμό κοντά σε χωριά
της Λακωνίας.
Το όνομά του σχετίζεται με την αρχαία περιοχή και το ιστορικό
όνομα Οἰνοῦς, που μπορεί να έχει σχέση με την παράδοση της
καλλιέργειας αμπελιών στην περιοχή.
Ο ποταμός ήταν σημαντικός για την παροχή νερού σε
παλαιούς οικισμούς και καλλιέργειες και αναφέρεται σε
ιστορικές πηγές της περιοχής.
Σήμερα έχει μειωμένη ροή σε ορισμένα τμήματα λόγω χρήσης
του νερού για άρδευση, αλλά παραμένει βασικό στοιχείο του
υδρογραφικού δικτύου της Λακωνίας.</p>
          </div>
        `));
        
        markers.push(L.marker([36.795,22.487]).bindPopup(`
          <div>
            <h3>Ποτάμια</h3>
            <img src="" alt="σμηνος (1)" style="width:100%;margin:10px;border-radius:8px;">
            <img src="" alt="σμηνος" style="width:100%;margin:10px;border-radius:8px;">
            <p>Ο Σμήνος είναι ποτάμι στη Λακωνία, κοντά στην περιοχή της
Ανατολικής Μάνης, που ρέει ανάμεσα σε λόφους και φυτείες, με νερά
που ήταν γνωστά στην αρχαιότητα για τη γλυκύτητά τους.
Ο ιστορικός περιηγητής Παυσανίας αναφέρει τα νερά του ως «πιεῖν
ἡδύ» — δηλαδή νόστιμα για πόση — κάτι που δείχνει πόσο εκτιμούσαν
το ποτάμι οι αρχαίοι κάτοικοι.
Το τοπίο γύρω του είναι πράσινο και ήρεμο, με ρέματα και φυτείες που
δημιουργούν ήρεμη ατμόσφαιρα για πεζοπορίες και φυσιολατρικές
εξορμήσεις.
Ο Σμήνος υπηρέτησε την ύδρευση και τις ανάγκες των κοινοτήτων της
Μάνης για αιώνες, καθώς και σήμερα παραμένει σημαντικό για τους
κατοίκους της περιοχής.</p>
          </div>
        `));
        
        break;
      case "caves":
        markers.push(L.marker([37.155,22.435]).bindPopup(`
          <div>
            <h3>Σπήλαια</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για σπήλαια.</p>
          </div>
        `));
        break;
      case "gorges":
        markers.push(L.marker([37.148,22.428]).bindPopup(`
          <div>
            <h3>Φαράγγια</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για φαράγγια.</p>
          </div>
        `));
        break;
      case "bridges":
        markers.push(L.marker([37.152,22.423]).bindPopup(`
          <div>
            <h3>Γεφύρια</h3>
            <img src="" alt="Φωτογραφία εδώ" style="width:100%;margin:10px;border-radius:8px;">
            <p>Κείμενο για γεφύρια.</p>
          </div>
        `));
        break;
    }

    markers.forEach(m => m.addTo(map));
  }

});
