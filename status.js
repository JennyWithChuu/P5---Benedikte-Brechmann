// Brugt AI til hjælp: [Ai], Prompts ligger inde på afleveringsmapppen/ dokumentet
// Derudover er der brugt W3 Schools til hjælp

//Vi henter alle checkbokse fra DOM
let checkboxes = document.querySelectorAll("input[type='checkbox']")

// array
let dataChecklist = [
    {
        liste: "trin1",
        task: "budget", 
        completed: false     
    },
    {
        liste: "trin1",
        task: "laanegodkendelse", 
        completed: false
    },
    {
        liste: "trin1",
        task: "prioriteringer", 
        completed: false
    },
    {
        liste: "trin2",
        task: "sammenligning", 
        completed: false
    },
    {
        liste: "trin2",
        task: "undersøg", 
        completed: false
    },
    {
        liste: "trin2",
        task: "dokumenter", 
        completed: false
    },
    {
        liste: "trin2",
        task: "udgifter", 
        completed: false
    },
    {
        liste: "trin2",
        task: "raadgiver", 
        completed: false
    },
    {
        liste: "trin3",
        task: "markedspris", 
        completed: false
    },
    {
        liste: "trin3",
        task: "strategi", 
        completed: false
    },
    {
        liste: "trin3",
        task: "bud", 
        completed: false
    },
    {
        liste: "trin3",
        task: "raadgiver", 
        completed: false
    },
    {
        liste: "trin4",
        task: "dokumentgennemgang", 
        completed: false
    },
    {
        liste: "trin4",
        task: "forståelse", 
        completed: false
    },
    {
        liste: "trin4",
        task: "raadgiver", 
        completed: false
    },
    {
        liste: "trin4",
        task: "godkendelse", 
        completed: false
    },
    {
        liste: "trin5",
        task: "boligovertagelse", 
        completed: false
    },
    {
        liste: "trin5",
        task: "aftalt-stand", 
        completed: false
    },
    {
        liste: "trin5",
        task: "alt-modtaget", 
        completed: false
    },
    {
        liste: "trin5",
        task: "forsikringer", 
        completed: false
    }
];

//Gem data i LocalStorage
function saveChecklist(data) {
    const stringified = JSON.stringify(data); //Laver data om til tekst
    localStorage.setItem("checklistData", stringified); //Gemmer data lokalt i browseren
};


//Hent gemt data
function loadChecklist() {
    const stored = localStorage.getItem("checklistData"); //Henter data

    // Hvis der IKKE er gemt noget endnu, bruges default arrayet 
    if (!stored) {
        return dataChecklist;
    }

    return JSON.parse(stored); //Hvis der er gemt noget, omdan til array
}

// Henter den data vi arbejder med - hvis intet er gemt, tager den default arrayet 
let checklistState = loadChecklist();


// Hvis der ikke findet noget i localstorage, så gem vores data derinde 
//Vi sikre at localstorage bliver fyldt - gemmer array til fremtidigt brug 
if (!localStorage.getItem("checklistData")) {
    saveChecklist(checklistState);
}


//Looper igennem alle checkboxes
checkboxes.forEach((checkbox) => {

    //Alle checkboxes får en eventlistner på, så når der sker en ændring i checkboxens state, så køres funktionen 
    checkbox.addEventListener("change", () => {

        //henter data atributterne fra DOM
        const list = checkbox.dataset.list;
        const task = checkbox.dataset.task;

        // Find søger efter det objekt i arrayet der matcher både list og task data atributterne fra DOM
        const match = checklistState.find(item =>
            item.liste === list &&
            item.task === task
        );

        //Hvis der er match opdateres det om checkboxen er checked eller ej i arrayet
        if (match) {

            //completed bliver true eller false alt efter checkboxens state
            match.completed = checkbox.checked;
        }

        //Nu gemmer vi arrayet på ny ved at omdanne til tekst
        localStorage.setItem(
            "checklistData",
            JSON.stringify(checklistState)
        );

        //Opdatere status teksten med det samme når bruger klikker
        updateTrinStatus();
    });
});

// Her gør vi så checkbokesene bliver checked igen efter reload 
function renderChecklist() {

    //Looper igennem alle checkboxes
    checkboxes.forEach((checkbox) => {

        //Henter data atributterne fra checkboxen
        const list = checkbox.dataset.list;
        const task = checkbox.dataset.task;

        //Finder det matchende objekt i arrayet
        const match = checklistState.find(item =>
            item.liste === list &&
            item.task === task
        );

        //Hvis objektet findes sættes checkboxens checked state ud fra den gemte data i localStorage
        if (match) {
            checkbox.checked = match.completed;
        }

    });
}

// Funktion til at opdatere status teksten for hvert trin
function updateTrinStatus() {

    //Henter alle status bokse fra DOM
    const statusBoxes = document.querySelectorAll(".trin__status");

    //Looper igennem alle status bokse
    statusBoxes.forEach((box) => {

        //Henter hvilket trin status boksen tilhører
        const trin = box.dataset.liste;

        //Filtrere arrayet så vi kun får items fra det specifikke trin
        const items = checklistState.filter(item => item.liste === trin);

        //Finder hvor mange opgaver der findes i trinnet totalt
        const total = items.length;

        //Finder hvor mange opgaver der er completed = true
        const completed = items.filter(item => item.completed).length;

        //Variabel til status teksten - udfyldes via IF statements
        let text = "";

        //Hvis ingen opgaver er completed skrives "Ikke startet"
        if (completed === 0) {
            text = "Status: Ikke startet";
        } 

        //Hvis alle tasks er completed skrives "Færdig"
        else if (completed === total) {
            text = "Status: Færdig";
        } 

        //Hvis nogle tasks er completed skrives "I gang"
        else {
            text = "Status: I gang";
        }

        //Indsætter status teksten i HTML elementet
        box.textContent = text;
    });
}

    //Vi kalder funktionerne for at sætte checkboxes state localStorage data
    renderChecklist();

    //vi kalder funktionerne for at sætte status tekster ud fra localStorage data
    updateTrinStatus();
