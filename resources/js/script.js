document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    const results = document.getElementById('results');
    const reviewForm = document.getElementById('review-form');
    let itemInput = document.getElementById('item-input');
    const reviewInput = document.getElementById('review-input');
    const submitBtn = document.getElementById('submit-button');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = document.getElementById('search-input').value;
      if (!searchTerm) {
        results.innerHTML = 'Please enter a search term.';
        return;
      }
      try {
        const response = await fetch(`/search?search=${searchTerm}`);
        const data = await response.json();
        console.log(data);
        results.innerHTML = `
          <div class="card h-100">
            <img src="https://image.tmdb.org/t/p/original${data.backdrop_path}" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${data.title} | ${data.release_date}</h5>
              <p>${data.overview}</p>
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#review-modal" id=addReview>
                Add Review
              </button>
            </div>
          </div>
        `;
        const addReviewButton = document.getElementById('addReview');
        const closeButton = document.getElementById('close');
        addReviewButton.addEventListener("click", () => {
            itemInput.value = data.title;
            document.getElementById("review-modal").style.display = "block";
        });
        submitBtn.addEventListener("click", () => {
            const item = itemInput.value;
            const review = reviewInput.value;
            if (!review) {
                alert('Please enter a review.');
                return;
            }
            fetch('/reviews', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ item, review })
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              // Redirect the user to the reviews page
              window.location.href = '/reviews';
            })
            .catch(error => {
              console.error(error);
            });
          });
        closeButton.addEventListener("click", () => {
            document.getElementById("review-modal").style.display = "none";
        });
      } catch (error) {
        console.error(error);
        results.innerHTML = 'Error fetching search results.';
      }
    });
  
    // reviewForm.addEventListener('submit', async (event) => {
    //   event.preventDefault();
    //   const itemName = itemInput.value;
    //   const reviewText = reviewInput.value;
    //   if (!reviewText) {
    //     alert('Please enter a review.');
    //     return;
    //   }
    //   try {
    //     const response = await fetch('/review', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         itemName,
    //         reviewText
    //       })
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     window.location.href = '/';
    //   } catch (error) {
    //     console.error(error);
    //     alert('Error adding review.');
    //   }
    // });
});