

export default function onOpenModal(event) { 
    event.preventDefault();
   
    const currentItem = event.target;
    

    if (currentItem.nodeName !== 'IMG') {
        return;
    }
    const instance = basicLightbox.create(`
    <img class="gallery__image" src="${largeImageUR}" width="800" height="600">
`)
    
    instance.show()
    window.addEventListener('keydown', onCloseModalClick);

}



function onCloseModalClick(event) {
    const openInstance = document.querySelector(".basicLightbox")
    if (event.code === "Escape") {
        openInstance.remove();
        // console.log(openInstance);
    }
    window.removeEventListener('keydown', onCloseModalClick);
   
   
}