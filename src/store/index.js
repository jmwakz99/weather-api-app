import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiKey: '1623e18c95563c6b5b319d57062c8b4a',
        location: {
            city: 'Nairobi',
            state: 'Kenya'
        },
        locationWeatherData: {
            iconUrl: '',
            description: '',
            humidity: '',
            temp: '',
            dewPoint: '',
            feelsLike: '',
            windSpeed: ''
        }
    },
    mutations: {
        changeLocation(state, payload) {
            state.location.city = payload.city
            state.location.state = payload.state
        },
        setWeather(state, payload) {
            state.locationWeatherData.iconUrl = payload.iconUrl
            state.locationWeatherData.humidity = payload.humidity
            state.locationWeatherData.feelsLike = payload.feelsLike
            state.locationWeatherData.windSpeed = payload.windSpeed
            state.locationWeatherData.description = payload.description
            state.locationWeatherData.temp = payload.temp
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setLoading(state, payload) {
            state.loading = payload

        }

    },
    actions: {
        async getWeather({ commit, getters, state }) {
            let link = `https://api.openweathermap.org/data/2.5/weather?q=${getters.location.city}&units=metric&apikey=${state.apiKey}`;

            await fetch(link)
                .then(resp => {
                    return resp.json()

                }).then(data => {

                    let weatherData = {};
                    weatherData.iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
                    weatherData.description = data.weather[0].description
                    weatherData.humidity = data.main.humidity
                    weatherData.feelsLike = data.main.feels_like
                    weatherData.temp = data.main.temp
                    weatherData.windSpeed = data.wind.speed
                    commit('setWeather', weatherData);
                }).catch(err => {
                    console.log(err)

                })
        },
        changeLocation({ commit }, payload) {
            commit('changeLocation', payload)
        }
    },
    getters: {
        locationWeatherData(state) {
            return state.locationWeatherData
        },
        location(state) {
            return state.location
        }
    }

})