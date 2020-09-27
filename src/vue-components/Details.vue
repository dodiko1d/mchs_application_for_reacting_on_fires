<template>
  <l-control position="center" v-if="detailsAsked" class="details__container">
      <h1>Текущие данные: </h1>
      <b-row cols="12">
        <b-col class="details__property-container" v-for="property in Object.keys(fire)" cols="6">
          <div class="details__property-name">{{ propertiesText[property] }}</div>
          <input class="details__property-value" v-model="fire[property]">
        </b-col>
      </b-row>
      <b-button @click="changeDetailsAsked" class="details__closing-button">x</b-button>
    <b-button class="details__changing-button" type="warning">{{ changingButtonText }}</b-button>
  </l-control>
</template>

<script>
import propertiesText from '@/assets/js/propertiesText';
import { LControl } from "vue2-leaflet";

export default {
  name: 'Details',
  props: ['changeDetailsAsked', 'fire', 'detailsAsked'],

  components: {
    LControl,
  },
  data () {
    return {
      propertiesText: propertiesText,
      changingButtonStatus: 'changing',
    }
  },
  computed: {
    changingButtonText: function () {
      return this.changingButtonStatus === 'changing' ? 'Редактировать': 'Сохранить'
    }
  }
}
</script>

<style lang="sass" scoped>
  .details__container
    left: 10vw
    top: 10vh
    width: 80%
    height: 80%
    background: #343A40
    color: aliceblue
    border-radius: 1.5em
    padding: 3em

  .details__closing-button
    position: absolute
    top: 1em
    right: 1em
    background: rgba(0, 0, 0, 0)
    border-radius: 50%

  .details__property-container
    margin-bottom: 1.5em

  .details__property-name
    font-size: 1.4em
    font-weight: bold

  .details__changing-button
    position: absolute
    right: 2em
    bottom: 2em
</style>
