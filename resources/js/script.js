// const form = document.getElementById('search-form');
// const searchInput = document.getElementById('search-input');
// const resultsDiv = document.getElementById('results');

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   const searchTerm = searchInput.value;
//   axios.get(`/api/search?q=${searchTerm}`)
//     .then(function(response) {
//       // Handle the API response here
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// });

// const searchButton = document.querySelector('#search-button');
// searchButton.addEventListener('click', searchItems);

// async function searchItems() {
//   const searchTerm = document.querySelector('#search-term').value;
//   try {
//     const response = await axios.get(`/search/${searchTerm}`);
//     const item = response.data[0];
//     const resultsDiv = document.querySelector('#search-results');
//     resultsDiv.innerHTML = `
//       <h2>${item.name || '-'}</h2>
//       <img src="${item.image || 'https://via.placeholder.com/150'}">
//       <a href="${item.link || '#'}">Link to item</a>
//       <button class="add-review">Add Review</button>
//     `;
//   } catch (error) {
//     console.error(error);
//     // Render error message
//   }
// }