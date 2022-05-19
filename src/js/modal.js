import 'basicLightbox/src/styles/main.scss';
import * as basicLightbox from 'basiclightbox';

function modalOpen(largeImageURL) {
  const modal = basicLightbox.create(`
    <div class="modal">
        <img src="${largeImageURL}">
    </div>
`);
  modal.show();
}

export default modalOpen;
