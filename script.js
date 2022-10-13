//You can edit ALL of the code here
let allEpisodes = [];
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// for episode of allEpisodes
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

//fixing search element issue
const searchFunctionEl = document.querySelector(".search-functions")
const episodesList = document.getElementById("episodes");
rootElem.append(searchFunctionEl, episodesList)

let inputEl = document.getElementById("searchInput");
inputEl.addEventListener('input', searchForEpisodes)
let searchResults = document.createElement('p')
searchFunctionEl.append(inputEl, searchResults)
searchResults.innerText = `Got ${episodeList.length} episode(s)`;



// creating initial elements for episodes
episodeList.forEach(episode => {
  let cardEl = document.createElement('div');
  let titleEl = document.createElement('h2');
  let imageEl = document.createElement('img');
  let summaryEl = document.createElement('div');
  let seasonNumber
  let episodeNumber

 //adding 0 to episode and season numbers

    if (episode.season < 10) {
      seasonNumber = `0${episode.season}`
      }
      else {
        seasonNumber = episode.season
      }
    
    if (episode.number < 10) {
					episodeNumber = `0${episode.number}`;
			} else {
					episodeNumber = episode.number;
			}
		
  cardEl.className = 'card';
  titleEl.className = 'title';
  imageEl.className = 'img';
  summaryEl.className = 'summary';

  titleEl.innerText = `${episode.name} S${seasonNumber}E${episodeNumber}`;
  imageEl.setAttribute("src" , episode.image.medium);
  summaryEl.innerHTML = episode.summary;

  // use append rather than append child so that you can do multiple elemnts t once
  cardEl.append(titleEl, imageEl, summaryEl);
  episodesList.append(cardEl);
}) 

}

function searchForEpisodes() {
	const searchInput = document.getElementById("searchInput").value;
	const allEpisodes = getAllEpisodes();
	const filteredEpisode = allEpisodes.filter((episode) => {
		return (
			episode.name.toLowerCase().includes(searchInput.toLowerCase()) ||
			episode.summary.toLowerCase().includes(searchInput.toLowerCase())
		);
	});
	const episodeResults = document.getElementById("episodes");
	episodeResults.innerHTML = "";
	makePageForEpisodes(filteredEpisode);
}







// next steps finding how to do the search function
// create a dynamic search feature





window.onload = setup;
