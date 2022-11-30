function addToFavourites(id) {
   let favouritesList = localStorage.getItem("myfavourites");
   let li = [];
   if(favouritesList!==null){
      li = JSON.parse(favouritesList);
   }

   li.push(id)

   localStorage.setItem("myfavourites",JSON.stringify(li));

}

function removeFromFavourites(id){ 
   let favouritesList = localStorage.getItem("myfavourites");
   let li = [];
   if(favouritesList!==null){
      li = JSON.parse(favouritesList);
   }

   li = li.filter((val)=>{
      return val!==id;
   })
   
   localStorage.setItem("myfavourites",JSON.stringify(li));
}

function showNotification(message) {

   let notiDiv = document.createElement("div");
   notiDiv.innerHTML = `
      <div class="notification">
         ${message}
      </div>
   `

   document.querySelector("main").appendChild(notiDiv);

   setTimeout(()=>{
      document.querySelector("main").removeChild(notiDiv);
   },2000)

}




