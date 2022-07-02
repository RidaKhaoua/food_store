// get scroll top
const buttonScrollTop = document.querySelector(".scroll-top");

// get foods section
const foodSection = document.querySelector(".foods");

// get icon food fav
const foodFav = [...document.querySelectorAll(".foods .box i")];


// get toggle bars
const toggleBras = document.querySelector("[data-toggle]");

// get ul list
const ulList = document.querySelector("[data-list]");

// get form 
const form = document.querySelector("[data-form]");


// get storys 
const storys = document.querySelectorAll(".story");

//get show story
const showStorys = document.querySelector(".show-story");

// get close story
const closeStory = document.querySelector(".show-story .close");


// get storys box 
const storysBox = document.querySelector(".storys-box");

// get story box
const storyBox = [...document.querySelectorAll(".story")];

// get section about 
const aboutSection = document.querySelector(".about");


// get   contcat us 
const contact = document.querySelector(".contact");

// get infos inside contact us
const infosInContact = document.querySelector(".contact .infos");

// get form inside contact us
const contactUs = document.querySelector(".contact .contact-us"); 

// get footer 
const footer = document.querySelector(".footer");

// get subscribe inside footer 
const subscribe = document.querySelector(".footer .subscribe");

// get services 
const services = document.querySelector(".services");

// get all box inside services
const allBoxs = document.querySelectorAll(".services .box");

// get with of box story 
let widthBoxStory = storyBox[0].offsetWidth + 40;


// store position start of the mouse
let start = 0 ;

// store position end of the mouse 
let change = 0;

storysBox.addEventListener("dragstart", (e) => {
    start = e.clientX;
})

storysBox.addEventListener("dragover", (e) => {
    let touche = e.clientX;
    change = start - touche;
    console.log(change);
})

storysBox.addEventListener("dragend", () => {
        if(change > 0) {
            storysBox.scrollLeft += widthBoxStory;
        } else {
            storysBox.scrollLeft -= widthBoxStory;
        }
})

// Events
toggleBras.addEventListener("click", () => {
        ulList.classList.toggle("show");
})

// show story 
storys.forEach(story => {
    story.addEventListener("click", (e)=> {
        showStorys.classList.add("active");
        const smallImg = document.querySelector(".small-img img");
        const imgOfStory = document.querySelector("[data-img-story]");
        smallImg.src = `${e.target.src}`; 
        imgOfStory.src = `${e.target.src}`
    })
})

closeStory.addEventListener("click", () => {
    showStorys.classList.remove("active")
})

window.addEventListener("scroll", function () {
    // footer
    if(this.scrollY >= footer.offsetTop - 300) {
        subscribe.classList.add("active");
    } else if (this.scrollY >= contact.offsetTop) { // contact
      infosInContact.classList.add("active");
      contactUs.classList.add("active");
    } else if (this.scrollY >= services.offsetTop) { // services
      allBoxs.forEach((box) => {
        box.classList.add("active");
      });
    } else if (this.scrollY >= foodSection.offsetTop) { // foodstore
      buttonScrollTop.classList.add("show");
      setTimeout(() => {
        buttonScrollTop.classList.add("active");
      }, 0);
    } else {
      buttonScrollTop.classList.remove("active");
      setTimeout(() => {
        buttonScrollTop.classList.remove("show");
      }, 0);
    }


})

buttonScrollTop.addEventListener("click", function () {
    window.scrollTo(0,0)
})

// add favorite recipe
foodFav.forEach(item => {
    item.addEventListener("click", function () {
        let getNameFood =
            this.parentElement.nextElementSibling.nextElementSibling
            .firstElementChild.textContent.toLocaleLowerCase();
        if(!item.classList.contains("fa-solid")) {
            this.classList.add("fa-solid");
            this.classList.add("red");
            console.log(getNameFood);
            storeFavFood(getNameFood);
        } else {
            this.classList.remove("fa-solid");
            this.classList.remove("red");
            deleteFavFood(getNameFood);
        }  
        
    })
})


// function

const storeFavFood = (name) => {
    if(!localStorage.getItem("fav-food")) {
        localStorage.setItem("fav-food","[]");
    } 

    let dataFood = {};
    dataFood["name"] = name;
    dataFood["isFav"] = true;
    let getFavFoodSave = JSON.parse(localStorage.getItem("fav-food"));
    getFavFoodSave.push(dataFood);
    localStorage.setItem("fav-food", JSON.stringify(getFavFoodSave));
}

const deleteFavFood = (name) => {
    if(localStorage.getItem("fav-food")) {
    let getFavFoodSave = JSON.parse(localStorage.getItem("fav-food"));
        let newArray =    getFavFoodSave.filter((item) => item.name !== name);
        localStorage.setItem("fav-food", JSON.stringify(newArray));
    }
}

const loadFavFood = () => {
    if(localStorage.getItem("fav-food")){
        let nameFoods = [...document.querySelectorAll(".box .name-food span")].map(item => item.textContent.toLocaleLowerCase());
        console.log(nameFoods);
        let getFavFoodSave = JSON.parse(localStorage.getItem("fav-food"));
        nameFoods.forEach(item => {
            getFavFoodSave.forEach(favFood => {
                if(item === favFood.name) {
                   let i = document.querySelector(`[data-${item}]`);
                    i.classList.add("fa-solid");
                    i.classList.add("red");
                }
            })
        })
    }
}

loadFavFood();