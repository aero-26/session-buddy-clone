"use strict";

const body = document.querySelector("body");
const editBtn = document.querySelectorAll(".edit-btn");
const link = document.querySelectorAll(".link");
const linkCloseBtn = document.querySelectorAll(".delete");
const popup = document.querySelectorAll(".container-popup")[0];
const popupTitle = popup.querySelector("input");
const popupTextArea = popup.querySelector("textarea");
const addDoneBtn = document.querySelector(".add-done-btn");
const closePopUp = document.querySelector(".popup-close");

// Applying click event to EDIT button
for (let i = 0; i < link.length; i++) {
  editBtn[i]?.addEventListener("click", () => {
    openDeatils(i);
  });
}

for (let i = 0; i < link.length; i++) {
  linkCloseBtn[i]?.addEventListener("click", () => {
    console.log(link[i]);
  });
}

// Edit button function
const openDeatils = (i) => {
  // Disabling the click on other stuffs other than the popup
  body.style.pointerEvents = "none";
  popup.style.pointerEvents = "auto";

  // Making popup visible and chaning the button text
  popup.classList.remove("hidden");
  addDoneBtn.innerText = "Done";

  // Entering the H1 as input text
  popupTitle.value = link[i].querySelector("h1").innerText;

  // Copying the links into an array
  let urlsList = link[i].querySelector("ul").querySelectorAll("li");
  let urlsArray = [];

  for (let i = 0; i < urlsList.length; i++) {
    urlsArray.push(urlsList[i].querySelector("a").innerText);
  }

  // Setting up dynamic size of the textbox
  if (urlsArray.lenght <= 8) {
    popupTextArea.style.height = urlsArray.length + 2 + "rem";
  } else {
    popupTextArea.style.height = "10rem";
  }

  // Putting the urls in text area
  popupTextArea.value = urlsArray.join("\n");
};

// Adding functionality for closing popup
closePopUp.addEventListener("click", () => {
  addDoneBtn.innerText = "Add";
  popup.querySelector("input").value = "";
  popup.querySelector("textarea").value = "";
  popup.classList.add("hidden");
  body.style.pointerEvents = "auto";
});
