document.querySelectorAll(".sidebar b").forEach(title=>{
  title.style.cursor = "pointer";

  title.onclick = ()=>{
    const box = title.parentElement;

    const buttons = box.querySelectorAll("button");

    buttons.forEach(btn=>{
      btn.style.display =
        btn.style.display === "none" ? "block" : "none";
    });
  };
});

document.addEventListener("DOMContentLoaded", function() {

  // Accordion menu
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

  const maps = {};

  function initMapForCategory(categoryId){
    if(maps[categoryId]) return;

    const mapDiv = document.getElementById("map-" + categoryId);
    if(!mapDiv) return;

    const map = L.map(mapDiv).setView([37.055,22.421], 11);
    maps[categoryId] = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:''}).addTo(map);

    const markers = [];

    // =============================
    // Εδώ βάζουμε μία πινεζα ανά κατηγορία
    // =============================
    const categoryPins = {
      "ancient": [{lat:37.143,lng:22.396,name:"Αρχαίο Μνημείο",text:"Κείμενο για το μνημείο.",imgs:["ancient1.jpg","ancient2.jpg","ancient3.jpg"]}],
      "churches": [{lat:37.150,lng:22.430,name:"Εκκλησία",text:"Κείμενο για την εκκλησία.",imgs:["church1.jpg","church2.jpg","church3.jpg"]}],
      "castles": [{lat:37.160,lng:22.420,name:"Κάστρο",text:"Κείμενο για το κάστρο.",imgs:["castle1.jpg","castle2.jpg","castle3.jpg"]}],
      "recipes": [{lat:37.140,lng:22.410,name:"Συνταγή",text:"Κείμενο για τη συνταγή.",imgs:["recipe1.jpg","recipe2.jpg","recipe3.jpg"]}],
      "products": [{lat:37.135,lng:22.400,name:"Προϊόν",text:"Κείμενο για το προϊόν.",imgs:["product1.jpg","product2.jpg","product3.jpg"]}],
      "costumes": [{lat:37.145,lng:22.415,name:"Φορεσιά",text:"Κείμενο για τη φορεσιά.",imgs:["costume1.jpg","costume2.jpg","costume3.jpg"]}],
      "dances": [{lat:37.138,lng:22.425,name:"Χορός",text:"Κείμενο για το χορό.",imgs:["dance1.jpg","dance2.jpg","dance3.jpg"]}],
      "songs": [{lat:37.142,lng:22.418,name:"Τραγούδι",text:"Κείμενο για το τραγούδι.",imgs:["song1.jpg","song2.jpg","song3.jpg"]}],
      "weaving": [{lat:37.137,lng:22.422,name:"Υφαντική Τέχνη",text:"Κείμενο για την υφαντική τέχνη.",imgs:["weaving1.jpg","weaving2.jpg","weaving3.jpg"]}],
      "legends": [{lat:37.139,lng:22.412,name:"Θρύλος",text:"Κείμενο για το θρύλο.",imgs:["legend1.jpg","legend2.jpg","legend3.jpg"]}],
      "rivers": [{lat:36.795,lng:22.487,name:"Ποταμός Σμήνος",text:"Ο Σμήνος είναι ποτάμι στη Λακωνία, κοντά στην περιοχή της Ανατολικής Μάνης,το οποίο ρέει ανάμεσα σε λόφους και φυτείες, με νερά που ήταν γνωστά στην αρχαιότητα για τη γλυκύτητά τους. Ο ιστορικός περιηγητής Παυσανίας αναφέρει τα νερά του ως «πιεῖνἡδύ», δηλαδή  νόστιμα για πόση, κάτι που δείχνει πόσο εκτιμούσαν το ποτάμι οι αρχαίοι κάτοικοι. Το τοπίο γύρω του είναι πράσινο και ήρεμο, με ρέματα και φυτείες που δημιουργούν ήρεμη ατμόσφαιρα για πεζοπορίες και φυσιολατρικές εξορμήσεις.Ο Σμήνος εξυπηρέτησε την ύδρευση και τις ανάγκες των κοινοτήτων της Μάνης για αιώνες.Ακόμα  και σήμερα παραμένει σημαντικό για τους κατοίκους της περιοχής.",imgs:["sminos (1).jpg","sminos.jpg"]}],
                [{lat:37.095,lng:22.159,name:"Ποταμός Ευρώτα",text:"Ο Ευρώτας  είναι ο σημαντικότερος ποταμός της Λακωνίας, με μήκος 82 χλμ. (περίπου).   Πηγάζει από τις νότιες πλαγιές του Ταΰγετου, που διασχίζει την πεδιάδα της Λακωνίας ως τον Λακωνικό κόλπο. Στην αρχαιότητα συνδέθηκε με τη Σπάρτη, καθώς το ποτάμι και η κοιλάδα του υπήρξαν ζωτικής σημασίας για την αγροτική ανάπτυξη και την ιστορική ζωή της περιοχής. Η κοιλάδα του Ευρώτα υπήρξε κατοικημένη από τη νεολιθική εποχή και αποτελεί πυρήνα πολιτισμού και γεωργίας από χιλιετίες. Στις = όχθες του φιλοξενούνται σημαντικοί υγρότοποι και οικοσυστήματα που προσελκύουν πλούσια πανίδα, ειδικά πουλιά κατά την περίοδο της μετανάστευσης.",imgs:["Evrotas-River-Greece.jpg","towns-menu.jpg"]}],
                [{lat:37.108,lng:22.433,name:"Ποταμός Οινούντας",text:"Ο Οινούντας, επίσης γνωστός στην περιοχή και ως Κελεφίνα,είναι παραπόταμος του Ευρώτα που ρέει από τις πλαγιές του Πάρνωνα και ενώνεται με τον κύριο ποταμό κοντά σε χωριά της Λακωνίας. Το όνομά του σχετίζεται με την αρχαία περιοχή και το ιστορικό όνομα Οἰνοῦς, που μπορεί να έχει σχέση με την παράδοση της καλλιέργειας αμπελιών στην περιοχή. Ο ποταμός ήταν σημαντικός για την παροχή νερού σε παλαιούς οικισμούς και καλλιέργειες και αναφέρεται σε ιστορικές πηγές της περιοχής. Σήμερα έχει μειωμένη ροή σε ορισμένα τμήματα λόγω χρήσης του νερού για άρδευση, αλλά παραμένει βασικό στοιχείο του υδρογραφικού δικτύου της Λακωνίας.",imgs:["oinountas.jpg"]}],
      "caves": [{lat:37.155,lng:22.435,name:"Σπήλαιο",text:"Περιγραφή για σπήλαιο.",imgs:["cave1.jpg","cave2.jpg","cave3.jpg"]}],
      "gorges": [{lat:37.148,lng:22.428,name:"Φαράγγι",text:"Περιγραφή για φαράγγι.",imgs:["gorge1.jpg","gorge2.jpg","gorge3.jpg"]}],
      "bridges": [{lat:37.152,lng:22.423,name:"Γεφύρι",text:"Περιγραφή για γεφύρι.",imgs:["bridge1.jpg","bridge2.jpg","bridge3.jpg"]}],
      "capes": [{lat:37.170,lng:22.440,name:"Ακρωτήριο",text:"Περιγραφή για ακρωτήριο.",imgs:["cape1.jpg","cape2.jpg","cape3.jpg"]}],
      "beaches": [{lat:37.165,lng:22.450,name:"Παραλία",text:"Περιγραφή για παραλία.",imgs:["beach1.jpg","beach2.jpg","beach3.jpg"]}],
    };

    if(categoryPins[categoryId]){
      categoryPins[categoryId].forEach(pin=>{
        let popupHTML = `<div><h3>${pin.name}</h3>`;
        pin.imgs.forEach(src=>{
          popupHTML += `<img src="images/${src}" style="width:100%;margin:5px;border-radius:8px;">`;
        });
        popupHTML += `<p>${pin.text}</p></div>`;
        markers.push(L.marker([pin.lat,pin.lng]).bindPopup(popupHTML));
      });
    }

    markers.forEach(m => m.addTo(map));
  }

});
