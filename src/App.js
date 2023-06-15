import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "https://cdn3d.iconscout.com/3d/premium/thumb/sun-and-cloud-3715214-3105197.png",
  "01n": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9z87Ux8ng1v1IpmpLwdvEmoxtIacqeyGRhg&usqp=CAU",
  "02d": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaLQuYujJSLGiMzmuug6-swREXej-29XV8wvkQdd0kZ7pHhDFFHKWp9mqbG77G5UU9XpM&usqp=CAU",
  "02n": "https://icons.veryicon.com/png/o/miscellaneous/ionicons-1/ios-cloudy-night-4.png",
  "03d": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shareicon.net%2Ftag%2Fcloudy-night&psig=AOvVaw1ZdBJKAm4Bse5bbnXYqN8t&ust=1675159112577000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDrqKyE7_wCFQAAAAAdAAAAABAQ",
  "03n": "https://www.google.com/imgres?imgurl=https%3A%2F%2Ficons.veryicon.com%2Fpng%2Fo%2Fmiscellaneous%2Fionicons-1%2Fios-cloudy-night-4.png&imgrefurl=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fionicons-1%2Fios-cloudy-night-4.html%3Fp%3D18&tbnid=I5OmDiTJx7Vn4M&vet=12ahUKEwiYoIaQhO_8AhVzTXwKHR76AK4QMygMegUIARDWAQ..i&docid=SBN9O7eFgscBaM&w=512&h=512&itg=1&q=cloudy%20night%20svg&ved=2ahUKEwiYoIaQhO_8AhVzTXwKHR76AK4QMygMegUIARDWAQ",
  "04d": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F47256%2Fsunny-day&psig=AOvVaw2ZgEYb1JYpGwscRXvhKcY7&ust=1675159071999000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLiLv4GE7_wCFQAAAAAdAAAAABAD",
  "04n": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbas.dev%2Fwork%2Fmeteocons&psig=AOvVaw1ZdBJKAm4Bse5bbnXYqN8t&ust=1675159112577000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDrqKyE7_wCFQAAAAAdAAAAABAI",
  "09d": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F7400&psig=AOvVaw3CT4wC21yOOLnSzTRsl_ZI&ust=1675158525016000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjuyPaC7_wCFQAAAAAdAAAAABAQ",
  "09n": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Fnight-cloud-rain-lightning-icon%2F&psig=AOvVaw3CT4wC21yOOLnSzTRsl_ZI&ust=1675158525016000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjuyPaC7_wCFQAAAAAdAAAAABAD",
  "10d": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fweather%2Fday-cloud-rain-icon.svg&imgrefurl=https%3A%2F%2Fuxwing.com%2Fday-cloud-rain-icon%2F&tbnid=KMbFG6t3s-r0QM&vet=12ahUKEwjUr_D3ge_8AhUFMrcAHfxCCpUQMygKegUIARDXAQ..i&docid=3a6zgoLGHyDyyM&w=800&h=702&q=rainy%20day%20%20night%20svg&ved=2ahUKEwjUr_D3ge_8AhUFMrcAHfxCCpUQMygKegUIARDXAQ",
  "10n": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fweather%2Fnight-cloud-rain-icon.svg&imgrefurl=https%3A%2F%2Fuxwing.com%2Fnight-cloud-rain-icon%2F&tbnid=Q38kBMncigElpM&vet=12ahUKEwjUr_D3ge_8AhUFMrcAHfxCCpUQMygFegUIARDNAQ..i&docid=HJLnq8vBEpEjaM&w=800&h=800&q=rainy%20day%20%20night%20svg&ved=2ahUKEwjUr_D3ge_8AhUFMrcAHfxCCpUQMygFegUIARDNAQ",
  "11d": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbrandeps.com%2Ficon%2FD%2FDay-sleet-storm-01&psig=AOvVaw1j8w8Q79YgjfxTsZPwhPHh&ust=1675157222872000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOiJ-Ln97vwCFQAAAAAdAAAAABAD",
  "11n": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Fday-cloud-lightning-icon%2F&psig=AOvVaw1j8w8Q79YgjfxTsZPwhPHh&ust=1675157222872000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOiJ-Ln97vwCFQAAAAAdAAAAABAI",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;
const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5dd2f2e444ff97d971ead33b266ada2b
      `,
    );
    updateWeather(response.data);
  };
  return (
    <Container>
      <AppLabel>React Weather App</AppLabel>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container>
  );
}

export default App;