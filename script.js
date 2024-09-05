"use strict";

const body = document.querySelector("body");
let editBtn = document.querySelectorAll(".edit-btn");

let linkCloseBtn = document.querySelectorAll(".delete");
const popup = document.querySelectorAll(".container-popup")[0];
const popupTitle = popup.querySelector("input");
const popupTextArea = popup.querySelector("textarea");
const closePopUp = document.querySelector(".popup-close");
const addBtn = document.querySelector(".add");
const addPopupBtn = document.querySelector(".add-open");
const linkContainer = document.querySelector(".container-links");
let link = document.querySelectorAll(".link");

// Applying click event to EDIT button and Close button
const activateEditBtn = () => {
  for (let i = 0; i < link.length; i++) {
    editBtn[i]?.addEventListener("click", () => {
      openDeatils(i);
    });
  }
};

const activateCloseBtn = () => {
  for (let i = 0; i < link.length; i++) {
    linkCloseBtn[i]?.addEventListener("click", () => {
      console.log(link[i]);
    });
  }
};

activateEditBtn();
activateCloseBtn();

// Edit button function
const openDeatils = (i) => {
  disableClick();
  showPopUp();

  addPopupBtn.innerText = "Done";

  // Entering the H1 as input text
  popupTitle.value = link[i]?.querySelector("h1").innerText;

  // Copying the links into an array
  let urlsList = link[i]?.querySelector("ul").querySelectorAll("li");
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
  addPopupBtn.innerText = "Add";
  popup.querySelector("input").value = "";
  popup.querySelector("textarea").value = "";
  popup.classList.add("hidden");
  body.style.pointerEvents = "auto";
});

// Function to disable click outside the popup and show popup function
const disableClick = () => {
  body.style.pointerEvents = "none";
  popup.style.pointerEvents = "auto";
};
const showPopUp = () => {
  popup.classList.remove("hidden");
};

// Add button functionality
addBtn.addEventListener("click", () => {
  showPopUp();
  disableClick();
});

// Clicking to Edit/Add btn within popup
addPopupBtn.addEventListener("click", () => {
  pushLinks();
  templateForLinks(arrForNewElement);
  activateEditBtn();
  closePopUp.click();
});

// Function to push array objects from text area
let arrForNewElement = [];

// Pushing the links within the textbox to array arrForNewElement.
const pushLinks = () => {
  arrForNewElement.push(popupTitle.value);
  let links = popupTextArea.value.split("\n");
  arrForNewElement.push(...links);
};

// Making the final template to be pushed in the HTML
const templateForLinks = (arr) => {
  let urls = [];

  for (let i = 1; i < arr.length; i++) {
    let urlTemplate = `
            <li>
              <a
                href="${arr[i]}"
                target="_blank"
                title="${arr[i]}"
                >${arr[i]}</a
              >
            </li>`;
    urls.push(urlTemplate);
  }

  let finalLi = urls.join("\n");

  let tempTemplate = document.createElement("div");

  tempTemplate.classList.add("link");

  tempTemplate.innerHTML = ` 
        <button class="edit-btn">Edit</button>
        <button class="close-btn delete">X</button>
        <h1>${arr[0]}</h1>
        <div class="urls">
          <ul>
            ${finalLi} 
          </ul>
        </div>
        <button class="add-open">Open All</button>`;

  // Adding condition to add the links
  if (addPopupBtn.innerText === "Add") {
    linkContainer.insertAdjacentElement("afterbegin", tempTemplate);
  }

  console.log(tempTemplate);

  // Reselecting the elements to activate them dynamially
  link = document.querySelectorAll(".link");
  editBtn = document.querySelectorAll(".edit-btn");
  linkCloseBtn = document.querySelectorAll(".delete");
  activateEditBtn();
  activateCloseBtn();

  // Emptying the array
  arrForNewElement = [];
};
