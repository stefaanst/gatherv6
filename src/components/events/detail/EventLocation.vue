<template>
  <div>
    <h3 class="is-size-5 location-address">{{location.address}}</h3>

    <div class="google-map" :id="title">

    </div>
  </div>
</template>

<script>
export default {
  name: "EventLocation",
  props: ["location", "title"],
  methods: {
    renderMap() {
      const element = document.getElementById(this.title);
      const loc = new google.maps.LatLng(this.location.lat, this.location.lng);
      const options = {
        zoom: 15,
        center: loc,
        styles: styles
      };
      const map = new google.maps.Map(element, options);
      const marker = new google.maps.Marker({ position: loc, map });
    }
  },
  mounted() {
    this.renderMap();
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

<style lang="scss" scoped>
.location-address {
  padding-bottom: 16px;
}
</style>