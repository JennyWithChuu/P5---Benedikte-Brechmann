function setActiveNavItem() {
    const navLinks = document.querySelectorAll("nav .nav");


    if (!navLinks.length) {
        return;
    }


    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();


    let activeHref = "";


    if (
        [
            "index.html",
            "rejsens-overblik.html",
            "trin1.html",
            "trin2.html",
            "trin3.html",
            "trin4.html",
            "trin5.html",
        ].includes(currentPage)
    ) {
        activeHref = "rejsens-overblik.html";
    } else if (currentPage === "kontakt.html") {
        activeHref = "kontakt.html";
    } else if (currentPage === "blog.html") {
        activeHref = "blog.html";
    } else if (currentPage === "raadgivning.html") {
        activeHref = "#";
    }


    navLinks.forEach((link) => {
        link.classList.remove("nav--active");
        link.removeAttribute("aria-current");


        if (link.getAttribute("href") === activeHref) {
            link.classList.add("nav--active");
            link.setAttribute("aria-current", "page");
        }
    });
}


window.addEventListener("DOMContentLoaded", setActiveNavItem);

