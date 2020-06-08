var distraction = document.querySelector("#distraction");
var sendbtn = document.querySelector("#send-btn");
var archiveBtn = document.querySelector("#archive-btn");
var backbtn = document.querySelector("#back-btn");
var homeScreen = document.querySelector("#home-screen");
var archiveScreen = document.querySelector("#archive-screen");
var archiveMessage = document.querySelector("h2");
var archiveContainer = document.querySelector("#notes-container");

sendbtn.addEventListener("click", () => {
	let distractionContent = distraction.value;

	if(distractionContent.length != 0)
		chrome.runtime.sendMessage({note: distractionContent.trim()});

	distraction.value = "";
})

archiveBtn.addEventListener("click", () => {
	chrome.runtime.sendMessage({note: "archive"});

	homeScreen.classList.add("hidden");
	archiveScreen.classList.remove("hidden");

	backbtn.addEventListener("click", () => {
		archiveScreen.classList.add("hidden");
		homeScreen.classList.remove("hidden");
	})
})

chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
	let contentObject = JSON.parse(msg.content);
	let contentArray = JSON.parse(contentObject.noteStorage);

	if(contentArray.length > 0)
	{
		archiveContainer.innerHTML = ' ';

		contentArray.forEach(distractionNote => {
			let noteElement = `<div class='py-2 text-base mt-2 mb-2'>${distractionNote}</div>`;

			archiveContainer.insertAdjacentHTML("beforeend", noteElement);
		});

		archiveMessage.classList.add("hidden");
		archiveContainer.classList.remove("hidden");
	}
})