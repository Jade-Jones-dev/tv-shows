//You can edit ALL of the code here
// initial variables
const rootElem = document.getElementById("root");
const searchFunctionEl = document.getElementById("search-functions");
const episodesList = document.getElementById("episodes");
const episodeDropdown = document.getElementById("episodeDropdown");
let allEpisodes;
let seasonNumber;
let episodeNumber;
let url = "https://api.tvmaze.com/shows/82/episodes";

const showSearchFunctionEl = document.getElementById("show-search-function");
const showSearchEl = document.getElementById("shows-search");
const showsdiv = document.getElementById("shows");
const showsDropdown = document.getElementById("showDropdown");
let showsUrl = "https://api.tvmaze.com/shows";
let allShows = getAllShows();
let showsList;

// fetching episodes data
fetch(url)
	.then((response) => response.json()) //necessary to get json response
	.then((data) => {
      allEpisodes = data;
    })
  .catch (function(error) {
	console.error(error);
  })

//  fetching show data
fetch(showsUrl)
		.then((response) => response.json())
		.then((data) => {
			allShows = data;
			console.log(data);
			getAllShows();
		});
// initial functions
function setup() {
	makePageForShows(allShows);
}

//Functions for shows

//create the show selector
let showSelect = document.getElementById("showDropdown");
let sortedAllShows = allShows.sort(compare);
for (let i = 0; i < allShows.length; i++) {
  let option = document.createElement("option");
  option.value = allShows[i].id;
  option.textContent = `${allShows[i].name}`;
  showSelect.appendChild(option);
}

//event listener for show dropdown
showsDropdown.addEventListener("change", (e) => {
	const showID = e.target.value;
	console.log(showID);
	showsdiv.innerHTML = "";
	makePageForShows(showID)
// 	e.target.value === "allShows" ? makePageShows(allShows) : fetching(showID);
});

// sort shows
function compare(a, b) {
	let aShow = a.name.toLowerCase();
	let bShow = b.name.toLowerCase();
	return aShow < bShow ? -1 : 1;
}

// create cards to display shows
function makePageForShows(showsList) {
	rootElem.textContent = `${showsList.length} shows`;

	showsList.sort((a, b) => {
		let aShow = a.name.toLowerCase();
		let bShow = b.name.toLowerCase();
		return aShow < bShow ? -1 : 1;
	});

	showsList.forEach((show) => {
		
		let aEl = document.createElement("a");
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");

		cardEl.className = "show-card";
		titleEl.className = "title";
		imageEl.className = "img;";

		cardEl.id = show.id;
		cardEl.value = show.id;
		titleEl.innerText = `${show.name}`;
		imageEl.setAttribute("src", show.image.medium);

		cardEl.append(imageEl, titleEl);
		aEl.append(cardEl);
		showsdiv.append(aEl);

		let optionEl = document.createElement("option");
		optionEl.innerHTML = `${show.name}`;
		optionEl.value = `${show.id}`;
		showsDropdown.append(optionEl);
	});
}

//adding event listener to search box
showSearchEl.addEventListener("keyup", searchShows2);

// creating search function
function searchShows2() {
	let search = document.getElementById("shows-search").value;
	const filteredShows = allShows.filter((show) => {
		return (
			show.name.toLowerCase().includes(search.toLowerCase()) 
		);
	});
	const results = document.getElementById("shows");
	results.innerHTML = "";
	makePageForShows(filteredShows);
	
}
/*
// Functions for episodes

// creating the initial cards for episodes
function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = ` ${episodeList.length} episode(s)`;
	episodeList.forEach((episode) => {
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
		let seasonEl = document.createElement("h3");
		let summaryEl = document.createElement("div");
		//adding 0 to episode and season numbers
		if (episode.season < 10) {
			seasonNumber = `0${episode.season}`;
		} else {
			seasonNumber = episode.season;
		}
		if (episode.number < 10) {
			episodeNumber = `0${episode.number}`;
		} else {
			episodeNumber = episode.number;
		}
		cardEl.className = "card";
		titleEl.className = "title";
		seasonEl.className = "season";
		imageEl.className = "img";
		summaryEl.className = "summary";
		titleEl.innerText = `${episode.name}`;
		seasonEl.innerText = `S${seasonNumber}E${episodeNumber}`;
		imageEl.setAttribute("src", episode.image.original);
		summaryEl.innerHTML = episode.summary;
		//appending the cards to the the container
		cardEl.append(imageEl, titleEl, seasonEl, summaryEl);
		episodesList.append(cardEl);
	});
	// creating the episode list dropdown menu by calling the function
	dropDownMenu(episodeList);
}

//adding event listener to search box
search.addEventListener("keyup", searchShows);

// creating search function
function searchShows() {
	let search = document.getElementById("search").value;
	const filteredEpisodes = allEpisodes.filter((episode) => {
		return (
			episode.name.toLowerCase().includes(search.toLowerCase()) ||
			episode.summary.toLowerCase().includes(search.toLowerCase())
		);
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(filteredEpisodes);
}

// creating dropdown
function dropDownMenu(episodeList) {
	episodeList.forEach((episode) => {
		let optionEl = document.createElement("option");
		//adding 0 to episode and season numbers
		if (episode.season < 10) {
			seasonNumber = `0${episode.season}`;
		} else {
			seasonNumber = episode.season;
		}
		if (episode.number < 10) {
			episodeNumber = `0${episode.number}`;
		} else {
			episodeNumber = episode.number;
		}
		optionEl.innerHTML = `${episode.name} S${seasonNumber}E${episodeNumber} `;
		optionEl.value = `E${episode.season}S${episode.number}`;
		episodeDropdown.append(optionEl);
	});
}

// adding event listener to the dropdown
episodeDropdown.addEventListener("change", function (e) {
	let selectedEpisode = e.target.value;
	let matchedEpisode = allEpisodes.filter((episode) => {
		return selectedEpisode == `E${episode.season}S${episode.number}`;
	});
	const results = document.getElementById("episodes");
	results.innerHTML = "";
	makePageForEpisodes(matchedEpisode);
});
*/
window.onload = setup;
