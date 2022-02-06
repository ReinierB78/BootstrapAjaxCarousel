var app = {
	init: function() {
    app.runCarousel()
	},
  setElementTemplate: function(index, src, tempo){
    return `<div class="carousel-item text-center ${index == 0 ? 'active' : ''}" data-bs-interval="${tempo}">
              <img src="${src}" width="50%" class="d-inlin-block" alt="...">
            </div>`				
  }, 
  runCarousel: function(){
    let index = 0;
    let maxSrc = 4; // TODO: fetch max in function
    let tempo = 3000; // TODO: set tempo via data attribute in template
    if(tempo <= 599) tempo = 600 

    // initial fetch of first image after pageload
    app.fetchImage(index, 282, 'pages', tempo)

    // loop for loading next image after x seconds
    const addToCarousel = setInterval(function() {
      index++;
      app.fetchImage(index, 282, 'pages', tempo);
      if (index >= maxSrc) {
        clearInterval(addToCarousel);
      }  
    }, tempo);
  },
  fetchImage: function(index, pageId, type, tempo) {
    $.ajax({
      url: 'https://reinierburgering.nl/wp-json/wp/v2/' + type + '/' + pageId + '/',
      success: function(data){
        // TODO: set actual render of view outside ajax function
        document.getElementById('carousel-inner').innerHTML += app.setElementTemplate(index, data.ACF.carousel_images[index].carousel_image.url, tempo)
      },
      error: function(err) {
        console.log('some is wrong: ' + err);
      }
    })
  },
}

$(document).ready(function() {
  app.init();
})