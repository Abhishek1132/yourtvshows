
let searchOutputDiv = document.querySelector(".search-output-container");

function favourited(e,id){

   if(!e.target.classList.contains("show-favourited")){
      e.target.innerText = "Remove from My Favourites❌";
      e.target.classList.add("show-favourited");

      addToFavourites(id);
      showNotification("Added to Favourites");
   }
   else{
      e.target.innerText = "Add to My Favourites🧡";
      e.target.classList.remove("show-favourited");

      removeFromFavourites(id);
      showNotification("Removed from Favourites");
   }
}

function search(e) {
   let query = e.target.value;

   if(query===""){
      searchOutputDiv.innerHTML = "";
      return;
   }

   query = query.replace(" ","+")
   fetch("https://api.tvmaze.com/search/shows?q="+query).then((res)=>res.json()).then((response)=>{

      searchOutputDiv.innerHTML = "";

      if(response.length===0){
         searchOutputDiv.innerHTML = `<p style="color:white; text-align:center">No Results Found!</p>`
      }

      let favouritesList = localStorage.getItem("myfavourites");

      for(let data of response){
         let showData = data.show;

         let isFavourited = false;

         if(favouritesList!==null && JSON.parse(favouritesList).includes(showData.id)){
            isFavourited = true;
         }

         let showCardEle = `
            <div class="show-card">
               <div class="show-card-img">
                  <img src="${showData.image!==null?showData.image.medium:"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}" alt="${showData.name}">
               </div>
               <div class="show-card-content">
                  <div class="show-card-title">${showData.name}</div>
                  <a href="./details.html?id=${showData.id}" class="show-details-btn" >Details💪</a>
                  <button class="show-favourite-btn ${isFavourited?"show-favourited":""}" onclick="favourited(event,${showData.id})" >${isFavourited? "Remove from My Favourites❌":"Add to My Favourites🧡"}</button>
               </div>
            </div>
         `

         searchOutputDiv.innerHTML+=showCardEle;

      }

   })
   .catch((err)=>{
      console.log(err);
      searchOutputDiv.innerHTML = `<p style="color:white; text-align:center">Error fetching data!</p>`
   })
}
