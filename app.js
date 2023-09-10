// Creating a form and card variable
const form = document.querySelector('#searchForm');
const cardsContainer = document.querySelector('#cardsContainer');

// getting the input and displaying it
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    form.elements.query.value = '';

    // cleaning screen before displaying something
    clearImages();

    // displaying stuff
    displayImages(res.data);
})

// createCard a card and returns it
function createCard(result) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-4', 'is-flex');

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const media = document.createElement('div');
    media.classList.add('media');

    const cardImage = document.createElement('div');
    cardImage.classList.add('media-left');

    const image = document.createElement('img');
    image.src = result.show.image.medium;
    image.alt = result.show.name;

    const mediaContent = document.createElement('div');
    mediaContent.classList.add('media-content');

    const title = document.createElement('p');
    title.classList.add('title', 'is-4', 'mb-2');
    title.textContent = result.show.name;

    const genres = result.show.genres.join(', ');

    const genreLinks = document.createElement('p');
    genreLinks.classList.add('subtitle', 'is-6', 'mb-2');
    genreLinks.textContent = genres;

    const tempElement = document.createElement('div');
    tempElement.innerHTML = result.show.summary;
    const summaryText = tempElement.textContent;

    mediaContent.appendChild(title);
    mediaContent.appendChild(genreLinks);
    mediaContent.appendChild(document.createTextNode(summaryText));

    cardImage.appendChild(image);

    media.appendChild(cardImage);
    media.appendChild(mediaContent);

    cardContent.appendChild(media);
    card.appendChild(cardContent);

    return card;
}

// displayImages adds the card to the screen
const displayImages = (shows) => {
    const cardContainer = document.querySelector('#cardsContainer');

    for (let result of shows) {
        if (result.show.image) {
            const card = createCard(result);
            cardContainer.appendChild(card);
        }
    }
}

// clearImages clears the images from the page
const clearImages = () => {
    cardsContainer.innerHTML = '';
}