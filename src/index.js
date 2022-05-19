import './sass/main.scss';
import refs from './js/refs';
import fetchImages from './js/fetch';

import debounce from 'lodash.debounce';
import template from './templates/image-card_template';
import modalOpen from './js/modal';

let page = 1;
let searchQuery;

refs.search.addEventListener('input', debounce(handleSearch, 500));
refs.loadMoreBtn.addEventListener('click', handleLoadMore);

refs.gallery.addEventListener('click', handleModal);
function handleModal(event) {
  event.preventDefault();
  if (event.target.tagName === 'IMG') {
    const largeImageURL = event.target.parentNode.href;
    modalOpen(largeImageURL);
  }
}

function handleSearch(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  searchQuery = event.target.value;

  if (searchQuery === '' || searchQuery === null) {
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  fetchImages(searchQuery, page).then(({ hits }) => {
    handleMarkup(hits);
  });
}

function handleMarkup(hits) {
  const markup = template(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function handleLoadMore() {
  page += 1;
  fetchImages(searchQuery, page).then(({ hits }) => {
    handleMarkup(hits);
    refs.loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}
