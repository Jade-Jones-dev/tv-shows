//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// for episode of allEpisodes
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
rootElem.textContent = `Got ${episodeList.length} episode(s)`;


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
  rootElem.append(cardEl);
}) 

}

// event listener for search input
const searchInput = document.querySelector('[data-search]')
searchInput.addEventListener("input", e => {
  const value = e.target.value
  console.log(value)
})





window.onload = setup;
