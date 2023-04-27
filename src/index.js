import './css/styles.css';
import axios from 'axios';
import { fetchPhoto } from './fetchPhoto';
import Notiflix from 'notiflix';

const inputText = document.querySelector('input');
const form = document.querySelector('form');
const btn = document.querySelector('button');
const gallery = document.querySelector('.gallery');


const URL = 'https://pixabay.com/api/'
const API_KEY = '35828732-80dbae6f7a9b2a665dfdc53c4'

form.addEventListener("submit", onSubmit)



function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget;
    const query = form.elements.searchQuery.value;

    if (query.length === 0) {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    
     fetchPhoto(query).then(()=>{createMarkup(hits)}) 
            
            // // if (hits.length === 0) {
            // // return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            
            // // createMarkup(hits)
            
            // }

        
    //     })
    //         .catch(onError)
    //         .finally(() => form.reset())
    // );
// }
    //     .then(({ hits }) => {
    //     if (hits.length === 0) {
    //         return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    //     }
    // }
       
    // ).catch(onError).finally(()=> form.reset())
   
   
}



   function createMarkup(hits) {
        const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
 `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`).join('');
        return console.log(gallery.innerHTML = markup);
        // gallery.innerHTML = markup;
        
    }

function onError(err){
console.log(err)
}

function onComplite() {
    
}