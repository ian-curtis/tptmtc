const $searchInput = document.querySelector('.search input')
const $search = document.querySelector('.search')
const $cardList = document.querySelector('.results .results_list')
const $suggestionList = document.querySelector('.suggestion_list')
const $main = document.querySelector('.search-wrap')
const $options = document.querySelector('.filters form')

const miniSearch = new MiniSearch({
  fields: ['brand', 'series', 'player', 'card_number', 'player_team', 'print_year', 'play_month', 'teams', 'inning_topbot', 'inning', 'play_keywords'],
  storeFields: ['brand', 'print_year', 'series', 'player', 'card_number', 'player_team', 'url']
})


fetch('/cards/search_index.json')
.then(response => response.json())
.then((index) => {
  return miniSearch.addAll(index)
})


// Typing into search bar updates search results and suggestions
$searchInput.addEventListener('input', (event) => {
  const query = $searchInput.value

  const results = (query.length > 1) ? getSearchResults(query) : []
  
  renderSearchResults(results)
  

})




// Changing any advanced option triggers a new search with the updated options
// $options.addEventListener('change', (event) => {
//   const query = $searchInput.value
//   const results = getSearchResults(query)
//   renderSearchResults(results)
// })

// Define functions and support variables
// Change this with other default search options
const searchOptions = {
  processTerm: (term) => term.toLowerCase(),
  fuzzy: 0.2
}

const getSearchResults = (query) => {
  // const searchOptions = getSearchOptions()
  
  return miniSearch.search(query, searchOptions)
}




const renderSearchResults = (results) => {
  
  $cardList.innerHTML = results.map(({ brand, print_year, series, player, card_number, player_team, url }) => {
    return `<li class="card">
      <h3>${capitalize(brand) + " " + capitalize(print_year) + " " + capitalize(series) + " " + capitalize(player)}</h3>
      <dl>
        <dt>Card Number:</dt> <dd>${card_number}</dd>
        <dt>Team:</dt> <dd>${capitalize(player_team)}</dd>
        <dt><a href="${url}">View Card Page</dt> <dd></dd>
      </dl>
    </li>`
  }).join('\n')

}


const getSearchOptions = () => {
  const formData = new FormData($options)
  const searchOptions = {}

  const team_filter = formData.get('team_filter')
  const brand_filter = formData.get('brand_filter')
  const play_year_filter = parseInt(formData.get('play_year_filter'), 10)
  const play_month_filter = formData.get('play_month_filter')
  const play_inning_filter = parseInt(formData.get('play_inning_filter'), 10)

  if (team_filter == "all") team_filter = null
  if (brand_filter == "all") brand_filter = null
  if (play_year_filter == "all") play_year_filter = null
  if (play_month_filter == "all") play_month_filter = null
  if (play_inning_filter == "all") play_inning_filter = null


  searchOptions.filter = ({ player_team, brand, play_year, play_month, inning}) => {
    play_year = parseInt(play_year, 10)
    inning = parseInt(inning, 10)
    return capitalize(player_team) == team_filter && capitalize(brand) == brand_filter && play_year == play_year_filter && capitalize(play_month) == play_month_filter && inning == play_inning_filter
  }

  return searchOptions
}


const capitalize = (string) => {
  if(!string) return
  return string.replace(/(\b\w)/gi, (char) => char.toUpperCase())
}








