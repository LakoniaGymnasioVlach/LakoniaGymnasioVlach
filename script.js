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
      const id=btn.getAttribute("data-target");
      document.querySelectorAll(".page").forEach(p=>p.classList.remove("visible"));
      const targetPage=document.getElementById(id);
      if(targetPage){ targetPage.classList.add("visible"); targetPage.scrollIntoView({behavior:"smooth"}); }
      document.querySelectorAll(".subBtn, .category-header").forEach(el=>el.classList.remove("active"));
      btn.classList.add("active");
      if(id==="rivers") setTimeout(initMap,200);
    });
  });

  // Leaflet Map
  let mapInitialized=false;
  function initMap(){
    if(mapInitialized) return;
    const mapContainer=document.getElementById("map");
    if(!mapContainer) return;
    const map=L.map('map').setView([37.055,22.421],11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:''}).addTo(map);

    L.marker([37.108,22.433]).addTo(map)
      .bindPopup(`<b>Ποταμός Οινούντας</b><br>
      <img src="images/οινουντας.jpg" style="width:100%;margin-top:10px;border-radius:8px;"><br>
      
      Ο Οινούντας, επίσης γνωστός στην περιοχή και ως Κελεφίνα,
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
υδρογραφικού δικτύου της Λακωνίας.`);

    L.marker([37.151,22.430]).addTo(map)
      .bindPopup(`<b>Ποταμός Ευρώτας</b><br>
      <img src="images/Evrotas-River-Greece.jpg" style="width:100%;margin-top:10px;border-radius:8px;"><br>
      <img src="images/towns-menu.jpg" style="width:100%;margin-top:10px;border-radius:8px;"><br>
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

<<<<<<< HEAD
    L.marker([36.795,22.487]).addTo(map)
      .bindPopup(`<b>Ποταμός Σμήνος</b><br>
      <img src="images/σμηνος (1).jpg" style="width:100%;margin-top:10px;border-radius:8px;"><br>
      <img src="images/σμηνος.jpg" style="width:100%;margin-top:10px;border-radius:8px;"><br>
      Ο Σμήνος είναι ποτάμι στη Λακωνία, κοντά στην περιοχή της
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
κατοίκους της περιοχής..`);
	
	mapInitialized=true;
=======
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "" }).addTo(map);

    // Ευρώτας
    L.marker([37.143,22.396]).addTo(map).bindPopup(`
      <div class="popup-card">
        <h3>Ποταμός Ευρώτας</h3>
        <img src="images/Evrotas-River-Greece.jpg" style="width:100%;margin:10px;border-radius:8px;">
        <img src="images/towns-menu.jpg" style="width:100%;margin:10px;border-radius:8px;">
		<p>
          Ο Ευρώτας είναι ο σημαντικότερος ποταμός της Λακωνίας, με γύρω
          στα 82 χλμ. μήκος και πηγές στις νότιες πλαγιές του Ταΰγετου,
          που διασχίζει την πεδιάδα της Λακωνίας ως τον Λακωνικό Κόλπο.
          Στην αρχαιότητα συνδέθηκε με τη Σπάρτη, καθώς το ποτάμι και η
          κοιλάδα του υπήρξαν ζωτικής σημασίας για την αγροτική ανάπτυξη και
          την ιστορική ζωή της περιοχής. Η κοιλάδα του Ευρώτα υπήρξε
          κατοικημένη από τη νεολιθική εποχή και αποτελεί πυρήνα πολιτισμού
          και γεωργίας από χιλιετίες. Οι όχθες του φιλοξενούν σημαντικούς
          υγροτόπους και οικοσυστήματα που προσελκύουν πλούσια πανίδα,
          ειδικά πουλιά κατά τη μετανάστευση.
        </p>
      </div>
    `);

    // Οινούντας
    L.marker([37.163, 22.410]).addTo(map).bindPopup(`
      <div class="popup-card">
        <h3>Ποταμός Οινούντας</h3>
        <img src="images/οινουντας.jpg" style="width:100%;margin:10px;border-radius:8px;">
        <p>
          Ο Οινούντας, επίσης γνωστός στην περιοχή και ως Κελεφίνα,
          είναι παραπόταμος του Ευρώτα που ρέει από τις πλαγιές του Πάρνωνα
          και ενώνεται με τον κύριο ποταμό κοντά σε χωριά της Λακωνίας.
          Το όνομά του σχετίζεται με την αρχαία περιοχή και το ιστορικό
          όνομα Οἰνοῦς, που μπορεί να έχει σχέση με την παράδοση της
          καλλιέργειας αμπελιών στην περιοχή. Ο ποταμός ήταν σημαντικός
          για την παροχή νερού σε παλαιούς οικισμούς και καλλιέργειες και
          αναφέρεται σε ιστορικές πηγές της περιοχής. Σήμερα έχει μειωμένη
          ροή σε ορισμένα τμήματα λόγω χρήσης του νερού για άρδευση, αλλά
          παραμένει βασικό στοιχείο του υδρογραφικού δικτύου της Λακωνίας.
        </p>
      </div>
    `);

    // Σμήνος
    L.marker([36.795, 22.487]).addTo(map).bindPopup(`
      <div class="popup-card">
        <h3>Ποταμός Σμήνος</h3>
        <img src="images/σμηνος.jpg" style="width:100%;margin:10px;border-radius:8px;">
        <img src="images/σμηνος (1).jpg" style="width:100%;margin:10px;border-radius:8px;">
		<p>
          Ο Σμήνος είναι ποτάμι στη Λακωνία, κοντά στην περιοχή της Ανατολικής Μάνης,
          που ρέει ανάμεσα σε λόφους και φυτείες, με νερά που ήταν γνωστά στην αρχαιότητα
          για τη γλυκύτητά τους. Ο ιστορικός περιηγητής Παυσανίας αναφέρει τα νερά του
          ως «πιεῖν ἡδύ» — δηλαδή νόστιμα για πόση — κάτι που δείχνει πόσο εκτιμούσαν
          το ποτάμι οι αρχαίοι κάτοικοι. Το τοπίο γύρω του είναι πράσινο και ήρεμο,
          με ρέματα και φυτείες που δημιουργούν ήρεμη ατμόσφαιρα για πεζοπορίες και
          φυσιολατρικές εξορμήσεις. Ο Σμήνος υπηρέτησε την ύδρευση και τις ανάγκες
          των κοινοτήτων της Μάνης για αιώνες, και σήμερα παραμένει σημαντικό για
          τους κατοίκους της περιοχής.
        </p>
      </div>
    `);

    mapInitialized = true;
>>>>>>> fd1fa6030dc36939b09721dbe34f8ba87181bb2a
  }

});