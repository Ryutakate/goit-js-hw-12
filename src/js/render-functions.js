import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function createGalleryItem({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="image-info">
            <li class="info-item"><p class="text">Likes</p><p class="text-value">${likes}</p></li>
            <li class="info-item"><p class="text">Views</p><p class="text-value">${views}</p></li>
            <li class="info-item"><p class="text">Comments</p><p class="text-value">${comments}</p></li>
            <li class="info-item"><p class="text">Downloads</p><p class="text-value">${downloads}</p></li>
        </ul>
    </li>
    `;
}

export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function renderGallery(images) {
    return images.map(createGalleryItem).join('');
}
