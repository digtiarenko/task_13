import axios from 'axios';

const Api = '27492943-191b6e85ce2b26a7ce823ae12';

async function fetchImages(searchQuery, page) {
  const { data } = await axios.get(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${Api}`,
  );
  return data;
}

export default fetchImages;
