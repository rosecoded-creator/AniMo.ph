window.addEventListener("DOMContentLoaded", () => {
    const fullName = localStorage.getItem("fullName") || "Unknown User";
    const contact = localStorage.getItem("contact") || "[Not set]";
    const location = localStorage.getItem("location") || "[Not set]";
    const rsbsa = localStorage.getItem("rsbsaId") || "[Not set]";
    const status = localStorage.getItem("accountStatus") || "Pending";

    document.querySelector(".pfp h3").textContent = fullName;
    document.getElementById("contact-number").textContent = contact;
    document.getElementById("location").textContent = location;
    document.getElementById("rsbsa-number").textContent = rsbsa;
    document.getElementById("account-status").textContent = status;
});



