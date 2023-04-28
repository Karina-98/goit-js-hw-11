import axios from "axios";

export default class ApiService {
   static ENDPOINT = "https://pixabay.com/api/";
   static API_KEY = "35828732-80dbae6f7a9b2a665dfdc53c4";

   constructor() {
      this.query = "";
      this.page = 1;
   }

   getfetchPhoto() {
      const url = `${ApiService.ENDPOINT}?key=${ApiService.API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      // return fetch(url).then((data) => {
      //    this.incrementPage()
      //    return data.json();
      // })
      return axios.get(url).then((data) => {
         this.incrementPage();
         console.log(data);
         return data.data
      })
   }

   incrementPage() { 
      this.page += 1;
   }

   resetPage() { 
     this.page = 1; 
   }
}