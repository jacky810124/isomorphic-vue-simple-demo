<template lang="html">
  <div class="container">
    <h1>Github Repositories</h1>
    <table-component :repos="repos"></table-component>
    <div class="text-right">
      <button class="btn btn-primary" @click="getData">Get more</button>
    </div>
  </div>
</template>

<script>
import fetch from 'universal-fetch'

import TableComponent from './components/table/table.vue'

export default {
  data () {
    return {
      repos: []
    }
  },
  methods: {
    getData () {
      fetch('/api/repos/1')
        .then(response => response.json())
        .then(result => {
          result.data.forEach(item => {
            this.repos.push(item)
          })
        })
    }
  },
  components: {
    TableComponent
  }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'HeitiTC', '微軟正黑體', '新細明體', sans-serif;
  }
</style>
