const introTexts = document.querySelectorAll(".intro__content");
const toggleButton = document.querySelector(".intro__toggle");


for (let i = 1; i < introTexts.length; i++) {
    introTexts[i].style.display = "none";
}



toggleButton.addEventListener("click", () => {

    const isHidden = introTexts[1].style.display === "none";

    for (let i = 1; i < introTexts.length; i++) {
        introTexts[i].style.display = isHidden ? "block" : "none";
    }



    toggleButton.textContent = isHidden
        ? "Læs mindre"
        : "Læs mere";
});