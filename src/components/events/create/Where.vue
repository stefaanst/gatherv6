<template>
  <div class="container">
    <div class="step-header has-text-centered">
      <div class="step-title">
        EVENT LOCATION
      </div>
      <div class="step-subtitle">
        Where is it going down?
      </div>
    </div>
    <div class="step-form">
      <div class="field">
        <label>LOCATION</label>
        <input type="text" ref="locationRef" placeholder="e.g. Spain, Times Square or simply your home address" class="loc-search input">
      </div>
      <div class="google-map" :id="title">

      </div>
    </div>
    <button class="button next-step" @click="goWho">Next</button>
  </div>
</template>

<script>
export default {
  name: "Where",
  data() {
    return {
      locSearch: null,
      location: null,
      address: "",
      lat: null,
      lng: null
    };
  },
  methods: {
    renderMap() {
      const element = document.getElementById(this.title);
      const loc = new google.maps.LatLng(this.lat, this.lng);
      const options = {
        zoom: 15,
        center: loc,
        styles: styles
      };
      const map = new google.maps.Map(element, options);
      const marker = new google.maps.Marker({ position: loc, map });
    },
    goWho() {
      this.$store.commit("event/SET_WHERE", {
        lat: this.lat,
        lng: this.lng,
        address: this.address
      });
      this.$store.commit("event/SET_ACTIVE_STEP", "Who");
    }
  },
  watch: {
    lat(value) {
      if (value !== null) {
        this.renderMap();
      }
    }
  },
  computed: {
    title() {
      return this.$store.getters["event/newEvent"].title;
    }
  },
  mounted() {
    this.locSearch = new google.maps.places.SearchBox(this.$refs.locationRef);
    this.locSearch.addListener("places_changed", () => {
      this.location = this.locSearch.getPlaces();
      this.location.forEach(loc => {
        this.address = loc.formatted_address;
        this.lat = loc.geometry.location.lat();
        this.lng = loc.geometry.location.lng();
      });
    });
  }
};
const styles = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#444444"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#4f595d"
      },
      {
        visibility: "on"
      }
    ]
  }
];
</script>

<style lang="scss">
</style>