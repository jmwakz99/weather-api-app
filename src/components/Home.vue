<template>
  <b-container>
    <b-row>
      <b-col xs="12" sm="12" md="6" class="mx-auto text-center bg-primary mt-5 p-5">
        <h1
          id="w-location"
          class="text-light"
        >{{location.city | capitalize}}, {{location.state | capitalize}}</h1>
        <h3 class="text-dark" id="w-desc">{{locationWeatherData.description | capitalize }}</h3>
        <h3 id="w-string" class="text-light">{{ locationWeatherData.temp }} F ({{fahrenheitTemp}} C)</h3>
        <b-img id="w-icon" :src="locationWeatherData.iconUrl"></b-img>
        <b-list-group id="w-details" class="mt-3">
          <b-list-group-item id="w-humidity">Relative Humidity: {{locationWeatherData.humidity}}</b-list-group-item>
          <b-list-group-item
            id="w-feels-like"
          >Feels Like: {{locationWeatherData.feelsLike}} F ({{fahrenheitFeelsLike}} C)</b-list-group-item>
          <b-list-group-item id="w-wind">Wind: {{locationWeatherData.windSpeed}} MPH</b-list-group-item>
        </b-list-group>
        <hr />
        <b-button v-b-modal.locModal>Change Location</b-button>
        <Modal />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  name: "Weather",
  components: {
    Modal
  },
  computed: {
    locationWeatherData() {
      return this.$store.getters.locationWeatherData;
    },
    location() {
      return this.$store.getters.location;
    },
    fahrenheitTemp() {
      let fahrenheit = this.locationWeatherData.temp;
      return Math.floor((fahrenheit - 32) / 1.8);
    },
    fahrenheitFeelsLike() {
      let fahrenheit = this.locationWeatherData.feelsLike;
      return Math.floor((fahrenheit - 32) / 1.8);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
