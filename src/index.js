import './css/styles.css';
import ApiService from './fetchPhoto.js'
import LoadMoreBtn from './components/LoadMoreBtn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";



const inputText = document.querySelector('input');
const form = document.querySelector('form');
const btn = document.querySelector('button');
const gallery = document.querySelector('.gallery');



const URL = 'https://pixabay.com/api/'
const API_KEY = '35828732-80dbae6f7a9b2a665dfdc53c4'

const apiService = new ApiService()

const loadMore = new LoadMoreBtn({
    selector: "#load-more",
    isHidden: true,
})
console.log(apiService);

loadMore.button.addEventListener("click", fetchMorePhoto);

form.addEventListener("submit", onSubmit)



function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;

  loadMore.show();

  apiService.resetPage();
  clearHTML();

    apiService.query = form.elements.searchQuery.value;  
  console.log(apiService);
   
 
  getPhotoMarkup()

  inputText.value = ""
    // .catch(onError).finally(() => form.reset())
}
    

async function getPhotoMarkup() { 
  loadMore.disable();
  return await apiService.getfetchPhoto().then(({ hits, totalHits }) => {
    //  console.log(hits)
    if (hits.length === 0) {
      loadMore.hide()
      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    console.log(totalHits);

    getTotalHits(totalHits)
    createMarkup(hits)
    
    
  }).catch(onError)
}

async function fetchMorePhoto() {
   await getPhotoMarkup();
}

async function getTotalHits() { 
  await apiService.getfetchPhoto().then(({ totalHits }) =>
  {
     if (totalHits === 0) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    } else if (totalHits < 40) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    }
 } )
}

   function createMarkup(hits) {
        const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
 `<div class="photo-card">
  <a class='gallery__link' href='${largeImageURL}'><img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" width='360' height='260' /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
    
  </div>
</div>`).join('');
     loadMore.enable();
        return gallery.insertAdjacentHTML("beforeend", markup);
        // gallery.innerHTML = markup;
        
    }

function onError(err){
console.log(err)
}

function clearHTML() {
  gallery.innerHTML = ""
}



// const lightbox = new SimpleLightbox('.gallery a', { 
   
//    captionsData: 'alt',
//    captionPosition: 'bottom',
//    captionDelay: 250,
   
//  });