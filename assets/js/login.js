// get email input
const email = document.querySelector("form #email");

// get password input
const password = document.querySelector("form #password");

// get from
const form = document.querySelector("form");



email.addEventListener("change", function (e) {
    let small = document.querySelector("[data-email]");
    if(/^[^0-9][a-zA-Z 0-9 _ - .]+[@][a-z]+[.][a-z]{3}$/gi.test(e.target.value)) {
        small.classList.remove("error");
        small.textContent = "";
        return true;
    } else {
        small.classList.add("error");
        small.textContent = "emil is not valid";
        return true;
    }

})

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if(email.value === "" || password.value === "") {
        let smalls = [...document.querySelectorAll("small")]
        smalls.forEach(small => {
            small.classList.add("error");
            small.textContent = "can not be empty";
        })
    } else {
        window.location.href = "index.html";
    }
})