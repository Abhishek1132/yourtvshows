
const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
});

if(params.id===null){
   document.querySelector("main").innerHTML = `
      <h2 style="color:orangered;text-align:center;">Error! Show ID is not provided/invalid.</h2>
      <h3 style="color:white;text-align:center;height:70vh">Redirecting to Home page...</h3>
   `

   document.body.style.cursor = "wait";

   setTimeout(()=>{
      open("./index.html","_self");
   },2000)
}

let showid = parseInt(params.id,10);

function favourited2(e,id){

   if(e.target.classList.contains("bi-heart")){
      e.target.classList.remove("bi-heart")
      e.target.classList.add("bi-heart-fill");
      addToFavourites(id);
      showNotification("Added to Favourites");
   }
   else{
      e.target.classList.remove("bi-heart-fill");
      e.target.classList.add("bi-heart");
      removeFromFavourites(id);
      showNotification("Removed from Favourites");
   }
}


let detailsContentDiv = document.querySelector(".details-content");

fetch("https://api.tvmaze.com/shows/"+showid).then((res)=>res.json()).then((data)=>{

   document.querySelector("title").innerText = `TV Shows | ${data.name}`

   let favouritesList = localStorage.getItem("myfavourites");

   let isFavourited = false;
   if(favouritesList!==null && JSON.parse(favouritesList).includes(showid)){
      isFavourited = true;
   }

   let content = `
      <img src="${data.image!==null?data.image.original:"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}" alt="${data.name}">
      <h1 class="details-title">${data.name}</h1>
      <i style="color:red" class="bi ${isFavourited?"bi-heart-fill":"bi-heart"}" onclick="favourited2(event,${showid})"></i>
   `

   detailsContentDiv.innerHTML = content;
})
.catch((err)=>{
   console.log(err);
   document.querySelector("title").innerText = `TV Shows | Details`;
   detailsContentDiv.innerHTML = `<h1 style="color:white;">Unable to Fetching Data!</h1><p style="color:white">Please check your internet connection.</p>`
})

