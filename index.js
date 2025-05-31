let myTabs = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"));
const tabBtn = document.getElementById("tab-btn");

if (tabsFromLocalStorage) {
  myTabs = tabsFromLocalStorage;
  render(myTabs);
}

const tabs = [{ url: "https://www.linkedin.com/in/celeste-rhoades/" }];

tabBtn.addEventListener("click", function () {
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // })

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myTabs.push(tabs[0].url);
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    render(myTabs);
  });
});

function render(tabs) {
  let listItems = "";
  for (let i = 0; i < tabs.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${tabs[i]}'>
          ${tabs[i]}
        </a>
        <button class="delete-single-btn" data-index="${i}">Delete</button>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;

  // Attach event listeners to the delete buttons after rendering
  const deleteButtons = document.querySelectorAll(".delete-single-btn");
  deleteButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const index = parseInt(btn.getAttribute("data-index"));
      myTabs.splice(index, 1);
      localStorage.setItem("myTabs", JSON.stringify(myTabs));
      render(myTabs);
    });
  });
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myTabs = [];
  render(myTabs);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value.trim() !== "") {
    myTabs.push(inputEl.value.trim());
    inputEl.value = "";
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    render(myTabs);
  }
});
