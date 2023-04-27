const URL = 'https://pixabay.com/api/'
const API_KEY = '35828732-80dbae6f7a9b2a665dfdc53c4'

function fetchPhoto(query) {
   return fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`).then((data) => { return data.json(); })
    
}

export { fetchPhoto };

// .then(({ hits }) => { console.log(hits) })