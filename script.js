const buttonShow = document.querySelector(".show-more");
const galleryListInner = document.querySelector(".gallery-list__inner");

let start = 0;
let end = 6;
let isLoading = false;
let shouldLoad = true;

//   function
function crateElement(element = "div", className, urlImg, IdImg) {
  const domElement = document.createElement(element);
  domElement.classList.add(className);

  if (urlImg) {
    domElement.src = urlImg;
  }

  if (IdImg) {
    domElement.textContent = IdImg;
  }

  return domElement;
}

function appendElement(WhereInsert, WhatInsert) {
  WhereInsert.appendChild(WhatInsert);
}

function getElements(data) {
  const fragment = document.createDocumentFragment();
  data.forEach((card) => {
    const galleryCardInner = crateElement("div", "gallery-card__inner");
    const galleryCard = crateElement("div", "gallery-card");
    const galleryCardImage = crateElement(
      "img",
      "gallery-card__image",
      card.url
    );
    const CardID = crateElement("div", "gallery-card__id", null, card.id);

    appendElement(galleryCardInner, galleryCard);
    appendElement(galleryCard, galleryCardImage);
    appendElement(galleryCard, CardID);

    fragment.appendChild(galleryCardInner);
  });

  galleryListInner.appendChild(fragment);

  start += 6;
  end += 6;
}

async function Show() {
  if (isLoading || !shouldLoad) return;
  isLoading = true;

  let url = "https://jsonplaceholder.typicode.com/photos/";
  const products = await fetch(url);
  const data = await products.json();

  isLoading = false;

  if (data.length >= end) {
    const dataResult = data.slice(start, end);
    getElements(dataResult);
  } else {
    const dataResult = data.slice(start, data.length);
    getElements(dataResult);

    shouldLoad = false;
  }
}

addEventListener("DOMContentLoaded", Show);

window.addEventListener("scroll", function () {
  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom < document.documentElement.clientHeight + 10) {
    Show();
  }
});
