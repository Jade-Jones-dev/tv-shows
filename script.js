//You can edit ALL of the code here
// initial variables
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const searchFunctionEl = document.getElementById("search-functions");
const episodesList = document.getElementById("episodes");
const episodeDropdown = document.getElementById("episodeDropdown");
let seasonNumber;
let episodeNumber;

// initial functions
function setup() {
	const allEpisodes = getAllEpisodes();
	makePageForEpisodes(allEpisodes);
  
}

function makePageForEpisodes(episodeList) {
	const rootElem = document.getElementById("root");
	rootElem.textContent = `Got ${episodeList.length} episode(s)`;
	episodeList.forEach((episode) => {
		let cardEl = document.createElement("div");
		let imageEl = document.createElement("img");
		let titleEl = document.createElement("h2");
		let summaryEl = document.createElement("div");
		//let seasonNumber moved outside so I can use in dropdown;
		//let episodeNumber moved outside so I can use in dropdwon;

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
		imageEl.className = "img";
		summaryEl.className = "summary";
    titleEl.innerText = `${episode.name} S${seasonNumber}E${episodeNumber}`;
		imageEl.setAttribute("src", episode.image.medium);
		summaryEl.innerHTML = episode.summary;

		cardEl.append(imageEl, titleEl, summaryEl);
		episodesList.append(cardEl);
	});
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
function dropDownMenu(episodeList){
  episodeList.forEach((episode) =>{
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
		episodeDropdown.append(optionEl);
	})
  
}



// next episode selector






window.onload = setup;
