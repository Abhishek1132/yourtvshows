let favouritesContainerDiv = document.querySelector(".favourites-container");

let favouritesIdList = localStorage.getItem("myfavourites");

function favourited3(e,id) { 

   if(!e.target.classList.contains("bi-heart")){
      removeFromFavourites(id);
      showNotification("Removed from Favourites");
      favouritesContainerDiv.removeChild(e.target.parentNode.parentNode.parentNode)
   }

   let favIdList = localStorage.getItem("myfavourites");

   if(favIdList===null || JSON.parse(favIdList).length===0){
      document.querySelector("main").innerHTML = `
         <h2 style="color:white;text-align:center;">Your favourites list is empty! Add some shows to your list.</h2>
      `
   }

}

if(favouritesIdList===null || JSON.parse(favouritesIdList).length===0){
   document.querySelector("main").innerHTML = `
      <h2 style="color:white;text-align:center;">Your favourites list is empty! Add some shows to your list.</h2>
   `
}
else{

   favouritesIdList = JSON.parse(favouritesIdList);

   for(let showid of favouritesIdList){

      fetch("https://api.tvmaze.com/shows/"+showid).then((res)=>res.json()).then((data)=>{

         let content = `
            <div class="favourited-card">
               <div class="favourited-card-img">
                  <img src="${data.image!==null?data.image.medium:"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}" alt="${data.name}">
               </div>
               <div class="favourited-card-content">
                  <h3 class="favourited-card-title">${data.name}</h3>
                  <p><i class="bi bi-heart-fill" style="color: red;" onclick="favourited3(event,${showid})"></i></p>
                  <a href="./details.html?id=${showid}">Details</a>
               </div>
            </div>
         `
         favouritesContainerDiv.innerHTML +=content;

      })
      .catch((err)=>{
         console.log(err);
         favouritesContainerDiv.innerHTML = `<h1 style="color:goldenrod; text-align:center">Error fetching data!</h1>`
      })

   }

}
