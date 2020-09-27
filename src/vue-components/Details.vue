<template>
  <l-control position="center" v-if="detailsAsked" class="details__container">
      <h1>Текущие данные: </h1>
      <b-row cols="12">
        <b-col class="details__property-container"
               v-for="property in Object.keys(fire)"
               lg="6"
               sm="12"
        >
          <label
            class="details__property-name"
            :id="`details__property-name-${property}`"
            :for="`details__property-value-${property}`">
            {{ propertiesText[property] }}
          </label>
          <input
            class="details__property-value"
            :id="`details__property-value-${property}`"
            v-model="fire[property]"
          >
        </b-col>
      </b-row>
      <b-button
        @click="changeDetailsAsked"
        class="details__closing-button"
      >x
      </b-button>
    <b-button
      v-if="changingButtonsStatus==='showing'"
      class="details__changing-button"
      cols="6"
      @click="changingButtonsStatusChange">
      Редактировать
    </b-button>
    <b-button
      v-if="changingButtonsStatus==='changing'"
      class="details__saving-button"
      cols="6">
      Сохранить
    </b-button>
    <b-button
    v-if="changingButtonsStatus==='changing'"
    class="details__changes-discarding-button"
    cols="6">
    Отмена
  </b-button>
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
      changingButtonsStatus: 'showing',
    }
  },
  methods: {
    changingButtonsStatusChange () {
      if (this.changingButtonsStatus === 'showing') {
        this.changingButtonsStatus = 'changing'
      } else if (this.changingButtonsStatus === 'changing') {
        this.changingButtonsStatus = 'showing'
      }
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
    overflow: auto

  .details__closing-button
    position: absolute
    top: 1em
    right: 1em
    background: rgba(0, 0, 0, 0)
    border-radius: 50%

  .details__property-container
    margin-bottom: 1.5em
    &:last-of-type
      margin-bottom: 5em


  .details__property-name
    font-size: 1.4em
    font-weight: bold
    display: block

  .details__button
    background: #FFC107
    color: #212121

  .details__changing-button
    @extend .details__button

  .details__saving-button
    @extend .details__button
    margin-right: 3em

  .details__changes-discarding-button
    @extend .details__button

</style>
