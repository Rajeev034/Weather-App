// const API_key= 'dc3b2509e9ffcdc2d434aeb0fc10e377';

// function render(data){
//     let newPara= document.createElement('p');
//     newPara.textContent= `${data?.main?.temp.toFixed(2)} C`;
//     document.body.appendChild(newPara);
// }

// async function fetchWeather(){
//     try{
//         const lat= 12.11;
//         const lon= 12.11
//         let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
//         let data= await res.json();
//         render(data);
//     }
//     catch(e){
//         console.log("Error found" , e);
//     }
// }

const your= document.querySelector("[data-userWeather]");
const search= document.querySelector("[data-searchWeather]");

let currentTab= your;
currentTab.classList.add('current-tab');

your.addEventListener("click", ()=>{
    switchTab(your)
});

search.addEventListener("click", ()=>{
    switchTab(search);
});

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove('current-tab');
        console.log('switched');
        currentTab=clickedTab;
        currentTab.classList.add('current-tab');
    }
}
