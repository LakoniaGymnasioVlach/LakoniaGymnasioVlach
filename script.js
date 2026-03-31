document.addEventListener("DOMContentLoaded", function() {

  // Accordion
  document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      document.querySelectorAll(".category-content").forEach(c => { if(c!==content)c.style.maxHeight=null; });
      content.style.maxHeight = content.scrollHeight + "px";
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
      }

      document.querySelectorAll(".subBtn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      initMapForCategory(id);
    });
  });

  // Maps
  const maps = {};

  function img(src){
    return `<img src="${src}" onerror="this.src='images/default.jpg'" style="width:100%;margin:10px;border-radius:8px;">`;
  }

  function initMapForCategory(categoryId){
    if(maps[categoryId]) return;

    const mapDiv = document.getElementById("map-" + categoryId);
    if(!mapDiv) return;

    const map = L.map(mapDiv).setView([37.05,22.42], 11);
    maps[categoryId] = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let markers = [];

    switch(categoryId){

      // ======================
      // ΥΛΙΚΗ
      // ======================
      case "ancient":
        markers.push(L.marker([37.143,22.396]).bindPopup(`
          <h3>Αρχαία Μνημεία</h3>
          ${img("images/ancient.jpg")}
          <p>Η Λακωνία φιλοξενεί σημαντικά αρχαία μνημεία που συνδέονται με τη Σπάρτη και τον αρχαίο ελληνικό πολιτισμό.</p>
        `));
        break;

      case "churches":
        markers.push(L.marker([37.150,22.430]).bindPopup(`
          <h3>Εκκλησίες</h3>
          ${img("images/church.jpg")}
          <p>Πλήθος βυζαντινών και μεταβυζαντινών εκκλησιών με μοναδική αρχιτεκτονική.</p>
        `));
        break;

      case "castles":
        markers.push(L.marker([37.160,22.420]).bindPopup(`
          <h3>Κάστρα</h3>
          ${img("images/castle.jpg")}
          <p>Ιστορικά κάστρα όπως ο Μυστράς μαρτυρούν τη μεσαιωνική ιστορία της περιοχής.</p>
        `));
        break;

      // ======================
      // ΑΥΛΗ
      // ======================
      case "recipes":
        markers.push(L.marker([37.140,22.410]).bindPopup(`
          <h3>Παραδοσιακές Συνταγές</h3>
          ${img("images/recipes.jpg")}
          <p>Η λακωνική κουζίνα περιλαμβάνει ελαιόλαδο, πίτες και τοπικά προϊόντα.</p>
        `));
        break;

      case "products":
        markers.push(L.marker([37.135,22.400]).bindPopup(`
          <h3>Τοπικά Προϊόντα</h3>
          ${img("images/products.jpg")}
          <p>Ελιές, πορτοκάλια και μέλι αποτελούν βασικά προϊόντα της περιοχής.</p>
        `));
        break;

      case "costumes":
        markers.push(L.marker([37.145,22.415]).bindPopup(`
          <h3>Παραδοσιακές Φορεσιές</h3>
          ${img("images/costumes.jpg")}
          <p>Οι φορεσιές αντικατοπτρίζουν την ιστορία και τα έθιμα της Λακωνίας.</p>
        `));
        break;

      case "dances":
        markers.push(L.marker([37.138,22.425]).bindPopup(`
          <h3>Χοροί</h3>
          ${img("images/dances.jpg")}
          <p>Παραδοσιακοί ελληνικοί χοροί που μεταδίδονται από γενιά σε γενιά.</p>
        `));
        break;

      case "songs":
        markers.push(L.marker([37.142,22.418]).bindPopup(`
          <h3>Τραγούδια</h3>
          ${img("images/songs.jpg")}
          <p>Δημοτικά τραγούδια που εκφράζουν την ιστορία και τη ζωή των κατοίκων.</p>
        `));
        break;

      case "weaving":
        markers.push(L.marker([37.137,22.422]).bindPopup(`
          <h3>Υφαντική Τέχνη</h3>
          ${img("images/weaving.jpg")}
          <p>Παραδοσιακή υφαντική με χειροποίητα υφάσματα.</p>
        `));
        break;

      case "legends":
        markers.push(L.marker([37.139,22.412]).bindPopup(`
          <h3>Θρύλοι</h3>
          ${img("images/legends.jpg")}
          <p>Τοπικοί θρύλοι που περνούν από γενιά σε γενιά.</p>
        `));
        break;

      // ======================
      // ΠΟΤΑΜΙΑ (3 pins)
      // ======================
      case "rivers":

        markers.push(L.marker([37.071,22.449]).bindPopup(`
          <h3>Ποταμός Ευρώτας</h3>
          ${img("images/Evrotas-River-Greece.jpg")}
          ${img("images/towns-menu.jpg")}
          <p>Ο Ευρώτας  είναι ο σημαντικότερος ποταμός της Λακωνίας, με μήκος 82 χλμ. (περίπου).   Πηγάζει από τις νότιες πλαγιές του Ταΰγετου, που διασχίζει την πεδιάδα της Λακωνίας ως τον Λακωνικό κόλπο. Στην αρχαιότητα συνδέθηκε με τη Σπάρτη, καθώς το ποτάμι και η κοιλάδα του υπήρξαν ζωτικής σημασίας για την αγροτική ανάπτυξη και την ιστορική ζωή της περιοχής. Η κοιλάδα του Ευρώτα υπήρξε κατοικημένη από τη νεολιθική εποχή και αποτελεί πυρήνα πολιτισμού και γεωργίας από χιλιετίες. Στις = όχθες του φιλοξενούνται σημαντικοί υγρότοποι και οικοσυστήματα που προσελκύουν πλούσια πανίδα, ειδικά πουλιά κατά την περίοδο της μετανάστευσης.</p>
        `));
κότερος ποταμός της Λακωνίας με ιστορική σημασία για τη Σπάρτη.
        markers.push(L.marker([37.108,22.433]).bindPopup(`
          <h3>Ποταμός Οινούντας</h3>
          ${img("images/oinountas.jpg")}
          <p>Ο Οινούντας, επίσης γνωστός στην περιοχή και ως Κελεφίνα,είναι παραπόταμος του Ευρώτα που ρέει από τις πλαγιές του Πάρνωνα και ενώνεται με τον κύριο ποταμό κοντά σε χωριά της Λακωνίας. Το όνομά του σχετίζεται με την αρχαία περιοχή και το ιστορικό όνομα Οἰνοῦς, που μπορεί να έχει σχέση με την παράδοση της καλλιέργειας αμπελιών στην περιοχή. Ο ποταμός ήταν σημαντικός για την παροχή νερού σε παλαιούς οικισμούς και καλλιέργειες και αναφέρεται σε ιστορικές πηγές της περιοχής. Σήμερα έχει μειωμένη ροή σε ορισμένα τμήματα λόγω χρήσης του νερού για άρδευση, αλλά παραμένει βασικό στοιχείο του υδρογραφικού δικτύου της Λακωνίας.</p>
        `));

        markers.push(L.marker([36.795,22.487]).bindPopup(`
          <h3>Ποταμός Σμήνος</h3>
          ${img("images/sminos1.jpg")}
          ${img("images/sminos.jpg")}
          <p>Ο Σμήνος είναι ποτάμι στη Λακωνία, κοντά στην περιοχή της Ανατολικής Μάνης,το οποίο ρέει ανάμεσα σε λόφους και φυτείες, με νερά που ήταν γνωστά στην αρχαιότητα για τη γλυκύτητά τους. Ο ιστορικός περιηγητής Παυσανίας αναφέρει τα νερά του ως «πιεῖνἡδύ», δηλαδή  νόστιμα για πόση, κάτι που δείχνει πόσο εκτιμούσαν το ποτάμι οι αρχαίοι κάτοικοι. Το τοπίο γύρω του είναι πράσινο και ήρεμο, με ρέματα και φυτείες που δημιουργούν ήρεμη ατμόσφαιρα για πεζοπορίες και φυσιολατρικές εξορμήσεις.Ο Σμήνος εξυπηρέτησε την ύδρευση και τις ανάγκες των κοινοτήτων της Μάνης για αιώνες.Ακόμα  και σήμερα παραμένει σημαντικό για τους κατοίκους της περιοχής.</p>
        `));

        break;

      // ======================
      // ΓΕΩΦΥΣΙΚΑ
      // ======================
      case "caves":
        markers.push(L.marker([37.155,22.435]).bindPopup(`
          <h3>Σπήλαια</h3>
          ${img("images/caves.jpg")}
          <p>Σπήλαια με γεωλογικό και τουριστικό ενδιαφέρον.</p>
        `));
        break;

      case "gorges":
        markers.push(L.marker([37.148,22.428]).bindPopup(`
          <h3>Φαράγγια</h3>
          ${img("images/gorges.jpg")}
          <p>Εντυπωσιακά φαράγγια ιδανικά για πεζοπορία.</p>
        `));
        break;

      case "bridges":
        markers.push(L.marker([37.152,22.423]).bindPopup(`
          <h3>Γεφύρια</h3>
          ${img("images/bridges.jpg")}
          <p>Παραδοσιακά πέτρινα γεφύρια της περιοχής.</p>
        `));
        break;
    }

    markers.forEach(m => m.addTo(map));
  }

});
