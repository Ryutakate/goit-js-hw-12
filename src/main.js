import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, lightbox } from './js/render-functions.js';

export const elements = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('#image-input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};

let searchQuery = '';
let page = 1;
const perPage = 40;

elements.loadMoreBtn.style.display = 'none';

elements.form.addEventListener('submit', async event => {
    event.preventDefault();
    searchQuery = elements.input.value.trim();
    page = 1;
    
    if (!searchQuery) return;

    elements.gallery.innerHTML = '<span class="loader"></span>';
    elements.form.reset();

    try {
        const { data } = await fetchImages(searchQuery, page, perPage);
        elements.gallery.innerHTML = '';

        if (!data.hits.length) {
            iziToast.info({
                message: 'Sorry, no images found. Try again!',
                backgroundColor: '#ef4040',
                position: 'topRight',
            });
            elements.loadMoreBtn.style.display = 'none';
        } else {
            elements.gallery.innerHTML = renderGallery(data.hits);
            lightbox.refresh();

            if (page * perPage < data.totalHits) {
                elements.loadMoreBtn.style.display = 'block';
            } else {
                elements.loadMoreBtn.style.display = 'none';
            }
        }
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
        elements.gallery.innerHTML = '';
    }
});

elements.loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    try {
        const { data } = await fetchImages(searchQuery, page, perPage);
        elements.gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
        lightbox.refresh();

        const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

        if (page * perPage >= data.totalHits) {
            elements.loadMoreBtn.style.display = 'none';
            iziToast.info({
                message: "You've reached the end of search results.",
                position: 'topRight',
            });
        }
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
    }
});
