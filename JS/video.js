

// console.log("video.js loaded");

// Fetch -> load -> Show
/**
 * -> Creat LoadCatagories - ei function DisplayCategories() function er kache jabe.
 * -> Fetch kore api theke data nie asbe
 * -> DisplayCategories() - data gulo dekhae dibe
 */

// Second to hours and munite conversion
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainderSecond = time % 3600;
  const munite = parseInt(remainderSecond / 60)
  remainderSecond = remainderSecond % 60;

  return `${hour}h ${munite}m ${remainderSecond}s ago`
}

//loadCategorie Videos();
const loadCategoryVideos=(id)=>{
  //alert(id);
  fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {displayVideos(data.category)
    //Shobaike active class remove kore dibe
    removeActiveClass();

    //id er class k active koro
    const activeBtn=document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");
  })
  .catch(error => console.log(error))
}

//button section function
const removeActiveClass=()=>{
  const buttons = document.getElementsByClassName("category-btn");
  //console.log(buttons);

  for(let btn of buttons){
    btn.classList.remove("active");
  }
}


// Details button click korle Details page e jabe
const loadDetails= async (videoId)=>{
  console.log(videoId);
  const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri);
  const data = await res.json();
  //console.log(data);
  displayDetails(data.video);
}

const displayDetails=(video)=>{
  console.log(video);
  const detailsContainer=document.getElementById("modal-content");
  detailsContainer.innerHTML=`
        <img src=${video.thumbnail} class="w-full h-[300px] object-cover"/>
         <p>${video.description} </p>
        `
  //way-1

  //document.getElementById("showModalData").click();

  //way-2
  document.getElementById("customModal").showModal();
}





//Creat LoadCatagories 

//for button
const loadCategories = () => {
  // console.log("Load Categories crsated");

  // fetch data--
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())

    // json() er vitor theke ekta object ashbe data oita contain kortese,
    // data.categories mane data object er vitor categories namer ekta array k return korbe.

    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}

/*

categories: Array(3)
[ {0: 
category: "Music"
category_id: "1001"
[[Prototype]]: Object },

{1: 
category: "Comedy"
category_id: "1003"
[[Prototype]]: Object },

{2: 
category: "Drawing"
category_id: "1005"
[[Prototype]]: Object] }
 ]

*/

const displayCategories = (categories) => {  // categories is a array, eita  parameter hishebe use kora hoise
  // console.log("Load Categories crsated");
  const categoryContainer = document.getElementById("categories");
  // categories namer nav er ID tare dhorse,
  // oitar moddhe categories namer array tare forEach diye array er item gulare iterate kore
  categories.forEach(item => { // item ekta parameter name, jeta catagories array er prottect object k bujhacche.
    console.log(item);



    // create a button
    //const button = document.createElement("button");
    //button.classList = "btn" // button er class set kora hoise
    // catagory hocche ekta object er property. eita catagories array er ekta object er property.
    //button.innerText = item.category;

    const buttonContainer=document.createElement("div");
    buttonContainer.innerHTML=`<button id="btn-${item.category_id}" 
                    onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>`;

    //add button to category container
    categoryContainer.appendChild(buttonContainer);  // button gulo category container e add hobe
  });
}



//for video

const loadVideos = (searchText="") => {
  // console.log("Load Categories crsated");

  // fetch data--
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}



// Object --
const cardDemo = {

  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: [
    {
      profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
      profile_name: "Olivia Mitchell",
      verified: ""
    }
  ],
  others: {
    views: "100K",
    posted_date: "16278"
  },
  description: "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats.Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."

};


const displayVideos = (videos) => { // videos is a parameter and a parameter name
  // console.log(videos);
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = ""; // video container er moddhe jodi kono kisu thake tahole seta remove korbe

   if(videos.length==0){
    videoContainer.classList.remove("grid");  
    videoContainer.innerHTML = `
    <div class=" min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="Assests/Icon.png" "/>

    <h2 class="text-center text-xl font-bold">
    No Content Here in this catwgory 
    </h2>

    </div>
    `;
    return
   }

   else{
    videoContainer.classList.add("grid");  
   }



  videos.forEach((video) => {
    console.log(video);
    // card create
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="w-full h-full object-cover"
      alt="Shoes" />
  
      ${video.others.posted_date?.length == 0 /* jeshokol posted date er length 0/true ase oder empty string dekhabe, : nahole string dekhabe*/
        ? " " : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white">${ getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
         <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>

    <div>
      <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2"> 
         <p class="text-gray-400">${video.authors[0].profile_name}</p>

         ${video.authors[0].verified == true ? // API er vitor jegulo true silo sudhu oigulai return korbe
        `<img class="w-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png"/>`
        : " "
      }
         
        </div>
        
        <p> <button onclick="loadDetails('${video.video_id}')" 
              class="btn btn-sm btn-error">Details</button> 
        </p>
    </div>
  </div>`;
    videoContainer.append(card);
  })

}
document.getElementById("search-input").addEventListener("keyup",(event)=>{
  loadVideos(event.target.value);
}) 

loadCategories();
loadVideos();