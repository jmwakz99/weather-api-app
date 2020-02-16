<template>
  <div class="home">
    <b-modal
      id="locModal"
      ref="modal"
      title="Choose your location"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="cityState"
          label="City"
          label-for="city"
          invalid-feedback="City is required"
        >
          <b-form-input id="city" v-model="city" :state="cityState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="stateState"
          label="State"
          label-for="state"
          invalid-feedback="State is required"
        >
          <b-form-input id="state" v-model="state" :state="stateState" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      city: "",
      state: "",
      cityState: "",
      stateState: "",
      submittedLocation: {}
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.cityState = valid;
      this.stateState = valid;

      return valid;
    },
    resetModal() {
      this.state = "";
      this.city = "";
      this.cityState = null;
      this.stateState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the city and state to submitted location
      this.submittedLocation.city = this.city;
      this.submittedLocation.state = this.state;

      this.$store.dispatch("changeLocation", this.submittedLocation);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$store.dispatch("getWeather");
        this.$bvModal.hide("locModal");
      });
    }
  }
};
</script>
