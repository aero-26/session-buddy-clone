"use strict";

const editBtn = document.querySelectorAll(".edit-btn");
const link = document.querySelectorAll(".link");
const linkCloseBtn = document.querySelectorAll(".delete");
const popup = document.querySelectorAll(".container-popup")[0];

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
  popup.querySelector("input").value = link[i].querySelector("h1").innerText;

  let urlsList = link[i].querySelector("ul").querySelectorAll("li");

  let urlsArray = [];

  for (let i = 0; i < urlsList.length; i++) {
    urlsArray.push(urlsList[i].querySelector("a").innerText);
  }

  popup.querySelector("textarea").style.height = urlsArray.length + 1 + "rem";

  popup.querySelector("textarea").value = urlsArray.join("\n");
};
