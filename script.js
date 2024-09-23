"use strict";

const body = document.querySelector("html");
let editBtn = document.querySelectorAll(".edit-btn");

let linkCloseBtn = document.querySelectorAll(".delete");
const popup = document.querySelectorAll(".container-popup")[0];
const popupTitle = popup.querySelector("input");
const popupTextArea = popup.querySelector("textarea");
const closePopUp = document.querySelector(".popup-close");
let addBtn = document.querySelector(".add");
const addPopupBtn = document.querySelector(".add-open");
const linkContainer = document.querySelector(".container-links");
let h1 = document.querySelectorAll("h1");
let ul = document.querySelectorAll("ul");
let link = document.querySelectorAll(".link");
let openLinkBtn = document.querySelectorAll(".openLink");

let emptyIndex;

// Reselecting the elements to activate them dynamially whenever body is clicked. Also adding Local Storage Function.

const activateAllBtns = () => {
  ul = document.querySelectorAll("ul");
  h1 = document.querySelectorAll("h1");
  link = document.querySelectorAll(".link");
  editBtn = document.querySelectorAll(".edit-btn");
  linkCloseBtn = document.querySelectorAll(".delete");
  openLinkBtn = document.querySelectorAll(".openLink");
  addBtn = document.querySelector(".add");
  activateAddBtn();
  activateOpenLinkBtn();
  activateEditBtn();
  closeBtnUpdate();
  createLocalStorage();
};

body.addEventListener("click", () => {
  activateAllBtns();
});

// Hiding Popup by default
popup.classList.add("hidden");

// Preventing the press of spacebar in Textarea
popupTextArea.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
});

// Applying click event to EDIT button and Close button
const activateEditBtn = () => {
  for (let i = 0; i < link.length; i++) {
    editBtn[i]?.addEventListener("click", () => {
      openDeatils(i);
      emptyIndex = i;
    });
  }
};

activateEditBtn();

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

  // Setting up dynamic size of the textbox as well
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
const activateAddBtn = () => {
  addBtn.addEventListener("click", () => {
    showPopUp();
    disableClick();
  });
};

// Clicking to Edit/Add btn within popup
addPopupBtn.addEventListener("click", () => {
  createOreditNewLinks();
  closePopUp.click();
});

const createOreditNewLinks = () => {
  pushLinks();
  templateForLinks(arrForNewElement);
  activateEditBtn();
  activateOpenLinkBtn();
};

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
        <button class="add-open openLink">Open All</button>`;

  // Adding condition to add the links
  if (
    addPopupBtn.innerText === "Add" &&
    tempTemplate.querySelector("h1").textContent !== "" &&
    tempTemplate.querySelector("a").textContent
  ) {
    console.log(tempTemplate.querySelector("a").textContent);
    linkContainer.insertAdjacentElement("afterbegin", tempTemplate);
  }

  if (addPopupBtn.innerText === "Done") {
    console.log(popupTitle.value);
    console.log(popupTextArea.value.split("\n"));
    h1[emptyIndex].textContent = popupTitle.value;
    let liArr = [];
    popupTextArea.value.split("\n").forEach((value) => {
      let tempLi = `<li>
        <a
          href="${value}"
          target="_blank"
          title="${value}"
        >
         ${value}
        </a>
      </li>`;
      liArr.push(tempLi);
    });
    ul[emptyIndex].innerHTML = liArr.join("\n");
    console.log(emptyIndex);
  }

  console.log(tempTemplate);

  // Emptying the array
  arrForNewElement = [];
};

// Adding functionality to Open Link button

const activateOpenLinkBtn = function () {
  for (let i = 0; i < openLinkBtn.length; i++) {
    openLinkBtn[i].addEventListener("click", openLink);
  }
};

function openLink() {
  let recordIndex;
  for (let i = 0; i < openLinkBtn.length; i++) {
    if (this === openLinkBtn[i]) {
      recordIndex = i;
    }
  }

  let links = ul[recordIndex].querySelectorAll("li");
  for (let i = 0; i < links.length; i++) {
    links[i].querySelector("a").click();
  }
}

// Add close set functionality or remove component
const closeBtnUpdate = () => {
  for (const btn of linkCloseBtn) {
    btn.addEventListener("click", removeComponent);
  }
};

const removeComponent = function () {
  for (let i = 0; i <= linkCloseBtn.length; i++) {
    if (this === linkCloseBtn[i]) {
      link[i].remove();
    }
  }
};

// Implementation of LocalStorage

const createLocalStorage = () => {
  let tempLinkDivs = [];
  for (const linkDiv of link) {
    if (linkDiv !== addBtn) {
      tempLinkDivs.push(`
      <div class="link">
      ${linkDiv.innerHTML}
      </div>`);
    } else if (linkDiv === addBtn) {
      tempLinkDivs.push(`
      <div class="link add">
      ${linkDiv.innerHTML}
      </div>`);
    }
  }

  const tempLinkToString = tempLinkDivs.join("\n");
  localStorage.setItem("Save", tempLinkToString);
  tempLinkDivs = [];
};

const checkLocalStorage = () => {
  if (localStorage.getItem("Save") !== "" && localStorage.getItem("Save")) {
    linkContainer.innerHTML = localStorage.getItem("Save");
    activateAllBtns();
  }
};

checkLocalStorage();
