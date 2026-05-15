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


//Gem data 
function saveChecklist(data) {
    const stringified = JSON.stringify(data); //Laver data om til tekst
    localStorage.setItem("checklistData", stringified); //Gemmer data localt
};


//Hent gemt data
function loadChecklist() {
    const stored = localStorage.getItem("checklistData"); //Henter data

    // Hvis der IKKE er gemt noget endnu - retuner array 
    if (!stored) {
        return dataChecklist;
    }

    return JSON.parse(stored); //Hvis der er gemt noget, omdan til array
}

// Henter den data vi arbejder med - hvis intet er gemt, tager den default arrayet 
let checklistState = loadChecklist();


// Hvis der ikke findet noget i localstorage, så gem vores data derinde 
//Vi sikre at localstorage bliver fyldt - gemmer array til remtidigt brug for brugeren
if (!localStorage.getItem("checklistData")) {
    saveChecklist(checklistState);
}


//Looper igennem alle checkboxes
checkboxes.forEach((checkbox) => {

    //Alle checkboxes får en eventlistner på 
    checkbox.addEventListener("change", () => {

        //henter data atributterne fra DOM
        const list = checkbox.dataset.list;
        const task = checkbox.dataset.task;

        // Matcher data attrubutterne med array for hver enkelt checkbox via find()
        const match = checklistState.find(item =>
            item.liste === list &&
            item.task === task
        );

        //opdater data hvis der er noget 
        if (match) {

            //completed bliver true eller false alt efter checkboxens state
            match.completed = checkbox.checked;
        }

        //Nu gemmer vi arrayet på ny 
        localStorage.setItem(
            "checklistData",
            JSON.stringify(checklistState)
        );

        //Opdatere status teksten med det samme når bruger klikker
        updateTrinStatus();
    });
});

function renderChecklist() {

    //Henter alle checkboxes fra DOM
    const checkboxes = document.querySelectorAll(".tjekliste__item__hide-box");

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

        //Hvis objektet findes sættes checkboxens checked state
        //ud fra den gemte data i localStorage
        if (match) {
            checkbox.checked = match.completed;
        }

    });
}

function updateTrinStatus() {

    //Henter alle status bokse fra DOM
    const statusBoxes = document.querySelectorAll(".trin__status");

    //Looper igennem alle status bokse
    statusBoxes.forEach((box) => {

        //Henter hvilket trin status boksen tilhører
        const trin = box.dataset.liste;

        //Filtrere arrayet så vi kun får items fra det specifikke trin
        const items = checklistState.filter(item => item.liste === trin);

        //Finder hvor mange tasks der findes i trinnet totalt
        const total = items.length;

        //Finder hvor mange tasks der er completed = true
        const completed = items.filter(item => item.completed).length;

        //Variabel til status teksten
        let text = "";

        //Hvis ingen tasks er completed
        if (completed === 0) {
            text = "Status: Ikke startet";
        } 

        //Hvis alle tasks er completed
        else if (completed === total) {
            text = "Status: Færdig";
        } 

        //Hvis nogle tasks er completed
        else {
            text = "Status: I gang";
        }

        //Indsætter status teksten i HTML elementet
        box.textContent = text;
    });
}

//Når HTML er loaded køres funktionerne automatisk
window.addEventListener("DOMContentLoaded", () => {

    //Sætter checkboxes state ud fra localStorage data
    renderChecklist();

    //Sætter status tekster ud fra localStorage data
    updateTrinStatus();
});