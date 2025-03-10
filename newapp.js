// //const url  = 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m';


// let input = document.querySelector("input");

// window.addEventListener("load", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log(position);

//       let long = position.coords.longitude;
//       let lat = position.coords.latitude;
//       const date = new Date();
//       const hour = date.getHours();

//       const apiId = "7ca0afbd452352c884ce4ba6ef48ad9a";
//       const owUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiId}`;
//       const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
//       const locUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
           
//       //get city function

//       const getCity = async () => {
//         try {
//           const response = await fetch(locUrl);
//           const result = await response.json();
//           let cityName = result.address.city || result.address.town || result.address.village;
//           return cityName;

//         }
//         catch (error) {
//           return console.error("unable to fetch city", error);
//         }
//       }

//       //get cityWeather function
//       const getCityWeather = async () => {
//         try {
//           const response = await fetch(owUrl);
//           const cityresult = await response.json();
//           console.log(cityresult);
//           return cityresult;
//         }
//         catch (error) {
//           return console.error("unable to fetch city data", error);
//         }
//       }

      
//       // get cityInput
//       const getInputWeather = async (cityInput) => {
//         const ctCrdns = `https://nominatim.openstreetmap.org/search?format=json&q=${cityInput}`;
//         const response = await fetch(ctCrdns);
//         const result = await response.json();
//         if (result.length > 0) {
//           const lati = result[0].lat;
//           const lon = result[0].lon;
//           const url = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${lon}&hourly=temperature_2m`;
//           console.log(result);
//           console.log(`City: ${cityInput}, Latitude: ${lati}, Longitude: ${lon}`);
//           return getWeather(url);
//         } else {
//           console.log('City not found');
//           return null;
//         }
//       }


      
//       //get Weather function
//       const getWeather = async (cityName, cityWeather) => {
//         try {
//           const response = await fetch(url);
//           console.log(response);
//           const data = await response.json();
//           console.log(data);
//           return showWeather(data, cityName, cityWeather);
//         }
//         catch (error) {
//           console.error("there's an error fetching data : ", error);
//         }
//       };

//       // showWeather function

//       const showWeather = (data, cityName, cityWeather) => {
//         let dateData = "";
//         let city = cityName;



//         for (let i = 1; i <= 5; i++) {
//           dateData += `hours: ${data.hourly.time[i + hour].substring(11, 16)}  temp: ${data.hourly.temperature_2m[i + hour] + " " + data.hourly_units.temperature_2m} <br>`;
//         }

//         divtwo.innerHTML = `<h2 id="city">
//         ${city},${cityWeather.name}
//         </h2>
//         <h2 id="temprature">temp: ${Math.round(cityWeather.main.temp - 278) + " " + data.hourly_units.temperature_2m}
//         </h2>
        
//         <p>humidity: ${cityWeather.main.humidity}
//         </p> 
//         <p>wind speed: ${cityWeather.wind.speed}
//         </p>
//         <p>humidity: ${cityWeather.weather[0].main}
//         </p>

//         <p id="date" style="text-align:left">${dateData}</p> 
//         `;
//       }

//       // button and func


//       let btn = document.getElementById("btn");



//       async function myFn() {
//         const cityName = await getCity();
//         const cityWeather = await getCityWeather();
//         getWeather(cityName, cityWeather);
//         return;
//       };
//       myFn();

//       btn.addEventListener('click', 
//           async function(event) {
//           event.preventDefault();
//           let cityInput= input.value.trim().toLowerCase();
//           if(cityInput){
//             await getInputWeather(cityInput);
//           }
//           else{
//             alert("please enter a city");
//           }
//         });

//     });
//   }

// }

// );







// let div = document.getElementById("div1");
// div.style.cssText = `
// border: 1px solid grey;
// color: black;
// display: flex;
// flex-direction: column;
// text-align: center;
// justify-content: center;
// align-items: center;
// margin: 100px auto 20px auto;
// width: 50%`;

// let divtwo = document.getElementById("div2");
// divtwo.style.cssText = `
// border: 1px solid grey;
// color: green;
// display: flex;
// flex-direction: column;
// justify-content: center;
// text-align: center;
// align-items: center;
// margin: 0px auto 20px auto;
// width: 50%`;

// input.style.cssText = `
// width: 40%;
// padding: 5px 10px;
// outline: none;
// margin: 10px;
// border-radius: 15px;
// border: 1px solid grey;
// `;
// btn.style.cssText = `
// width: 40%;
// padding: 5px 10px;
// outline: none;
// margin: 0px 0px 10px 0px;
// border-radius: 15px;
// border: 1px solid grey;
// `;


let input = document.querySelector("input");
let btn = document.getElementById("btn");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      const apiId = "7ca0afbd452352c884ce4ba6ef48ad9a";

      // Get hour dynamically
      const date = new Date();
      const hour = date.getHours();

      // API URLs
      const owUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiId}`;
      const locUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;

      // Get city name
      const getCity = async () => {
        const response = await fetch(locUrl);
        const result = await response.json();
        return result.address.city || result.address.town || result.address.village;
      };

      // Get city weather
      const getCityWeather = async () => {
        const response = await fetch(owUrl);
        return await response.json();
      };

      // Main function to get weather
      async function myFn() {
        const cityName = await getCity();
        const cityWeather = await getCityWeather();
        await getWeather(lat, long, cityName, cityWeather, hour);
      }
      myFn(); // call on page load

      // Handle button click for user input
      btn.addEventListener("click", async function (event) {
        event.preventDefault();
        let cityInput = input.value.trim().toLowerCase();
        if (cityInput) {
          await getInputWeather(cityInput);
        } else {
          alert("Please enter a city!");
        }
      });

      // Get coordinates and weather for input city
      const getInputWeather = async (cityInput) => {
        const ctCrdns = `https://nominatim.openstreetmap.org/search?format=json&q=${cityInput}`;
        const response = await fetch(ctCrdns);
        const result = await response.json();
        if (result.length > 0) {
          const lat = result[0].lat;
          const long = result[0].lon;
          const apiId = "7ca0afbd452352c884ce4ba6ef48ad9a";
          const owUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiId}`;
          const responseWeather = await fetch(owUrl);
          const cityWeather = await responseWeather.json();

          const date = new Date();
          const hour = date.getHours(); // recalculate current hour
          await getWeather(lat, long, cityInput, cityWeather, hour);
        } else {
          alert("City not found!");
        }
      };

      // Get weather data and show
      const getWeather = async (lat, long, cityName, cityWeather, hour) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
        const response = await fetch(url);
        const data = await response.json();
        showWeather(data, cityName, cityWeather, hour);
      };

      // Show weather data
      const showWeather = (data, cityName, cityWeather) => {
        let dateData = "";
        let city = cityName;
      
        const currentDate = new Date();
        const currentTimeISO = currentDate.toISOString();
        const timeArray = data.hourly.time;
        let nearestIndex = timeArray.findIndex(time => time > currentTimeISO);
        if (nearestIndex === -1) nearestIndex = 0;
      
        for (let i = 0; i < 5; i++) {
          let time = timeArray[nearestIndex + i].substring(11, 16); // Get hour:minute
          let temp = data.hourly.temperature_2m[nearestIndex + i];
          dateData += `Hour: ${time} | Temp: ${temp} ${data.hourly_units.temperature_2m} <br>`;
        }
      
        divtwo.innerHTML = `<h2 id="city">
          ${city}, ${cityWeather.name}
          </h2>
          <h2 id="temprature">Temp: ${Math.round(cityWeather.main.temp - 273.15)} °C
          </h2>
          <p>Humidity: ${cityWeather.main.humidity}%</p> 
          <p>Wind Speed: ${cityWeather.wind.speed} m/s</p>
          <p>Weather: ${cityWeather.weather[0].main}</p>
          <p id="date" style="text-align:left">${dateData}</p>`;
      };
      
    });
  }
});

// Styling
let div = document.getElementById("div1");
div.style.cssText = `
  border: none;
  outline: none;
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 100px auto 5px auto;
  background-color: white;
  opacity: 70%;
  border-radius: 10px;
  blend: multiply;
  width: 50%`;

let divtwo = document.getElementById("div2");
divtwo.style.cssText = `
  border: none;
  color: green;
  border-radius: 10px;
  outline: none;
  display: flex;
  background-color: white;
  opacity: 70%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0px auto 20px auto;
  width: 50%`;

input.style.cssText = `
  width: 50%;
  padding: 10px 10px;
  outline: none;
  margin: 10px;
  border-radius: 15px;
  border: 1px solid grey;`;

btn.style.cssText = `
  width: 40%;
  background-color: #2196f3;
  color: #ffffff;
  font-size: 15px;
  outline: none;
  padding: 5px 10px;
  outline: none;
  border: none;
  margin: 0px 0px 10px 0px;
  border-radius: 10px;
  `;

let body = document.body;
body.style.backgroundImage = "url('https://images.unsplash.com/photo-1561484930-974554019ade?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";



