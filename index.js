//API is a mechanism that establish communication between two software components

const userTab= document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

const GrantAccessContainer= document.querySelector(".grantLocation")
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen= document.querySelector(".loading-container");
const userInfoContainer= document.querySelector(".user-info-container");
const userContainer= document.querySelector(".weather-container");
const errorMessage = document.querySelector(".error-message-container");

let currentTab= userTab;
currentTab.classList.add('current-tab');
const API_key= 'dc3b2509e9ffcdc2d434aeb0fc10e377';

userTab.addEventListener("click", ()=>{
    switchTab(userTab);
})  
searchTab.addEventListener("click", ()=>{
    switchTab(searchTab);
})
getfromSessionStorage(); // To check if the location is already present in it 

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        // errorMessage.classList.remove('active')
        currentTab.classList.remove('current-tab');
        currentTab=clickedTab;
        currentTab.classList.add('current-tab');
    }

    if(!searchForm.classList.contains('active')){

        GrantAccessContainer.classList.remove('active');
        userInfoContainer.classList.remove('active');
        // errorMessage.classList.remove('active')
        searchForm.classList.add('active');
    }
    else{
        //me search waale tab par tha and ab your weather tab visible kraana hai
        searchForm.classList.remove('active');
        userInfoContainer.classList.remove('active');
        //ab me your wweather tab me aagya hu, so check local storage to get the location data 
        getfromSessionStorage();
    }

}


function getfromSessionStorage(){
    const localCoordinates= sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //Agar coordinates nahi mile toh location waala tab visible kraana hai
        GrantAccessContainer.classList.add('active');
        
    }
    else{
        //if found 
        const coordinates= JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates); // user ke weather ko fetch krta
    }
};

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon}= coordinates;
    // make grant location container invisible
    GrantAccessContainer.classList.remove('active');

    //make loader visible
    loadingScreen.classList.add('active');

    //API Call
    try{
        const res= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
            );
        
        const data= await res.json();

        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);  //UI ke upr data show krega
    }

    catch(e){
        loadingScreen.classList.remove('active');
    }
}

function renderWeatherInfo(data){
    //fetch krne pdenge elements
    const cityName= document.querySelector("[data-cityName]") ;
    const countryIcon= document.querySelector("[data-countryIcon]");
    const desc= document.querySelector("[data-weatherDesc]");
    const weatherIcon= document.querySelector("[data-weatherIcon]")
    const temp= document.querySelector("[data-temp]")
    const windspeed= document.querySelector("[data-windspeed]")
    const humidity= document.querySelector("[data-humidity]")
    const clouds= document.querySelector("[data-clouds]")
  
    //Fetch info from weatherInfo and put it in UI

    cityName.innerText= data?.name;
    countryIcon.src= `https://flagcdn.com/144x108/${data?.sys?.country?.toLowerCase()}.png`; 
    desc.innerText= data?.weather?.[0]?.description;
    weatherIcon.src= `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText= `${data?.main?.temp}°C`;
    windspeed.innerText= `${data?.wind?.speed}m/s`;
    humidity.innerText= `${data?.main?.humidity}%`;
    clouds.innerText=`${data?.clouds?.all}%`;
}

const grantBtn= document.querySelector("[data-grantAccess]");
grantBtn.addEventListener("click", getLocation);

//access grant krta hai user ki location
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);  //showPosition is a function
    }
    else{
       console.log("Not supported");
    }
}

function showPosition(position){

    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}   

let searchInput= document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName= searchInput.value;

    if(cityName === ""){
        return;
    }
    
    else{
        fetchSearchWeather(cityName);
    }
})

async function fetchSearchWeather(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    GrantAccessContainer.classList.remove("active");

    try{ 
        const res= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric `
            );
        const data= await res.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e){
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.remove('active');
        errorMessagefunc();
        // window.alert("Error catch4");
        // error-message-container.classList.add('active');
    }
}

function errorMessagefunc(){
    errorMessage.classList.add('active')
}   
























// const API_key= 'dc3b2509e9ffcdc2d434aeb0fc10e377';

// async function showWeather(){
//     let city = "Himachal pradesh";
//     const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric `);
//     const data= await response.json();
//     console.log("The data is "+ data);

//     let newPara= document.createElement('p');
//     newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`         

//     document.body.appendChild(newPara);
// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("Not supported");
//     }
// }

// function showPosition(position){
//     let lat= position.coords.latitude;
//     let long= position.coords.longitude;

//     console.log(lat);
//     console.log(long);
// }