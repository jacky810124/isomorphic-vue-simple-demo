<template lang="html">
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      repos: []
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'HeitiTC', '微軟正黑體', '新細明體', sans-serif;
  }
</style>
<!-- <template lang="html">
  <div>
    <header-component></header-component>
    <div class="container">
      <section class="row">
        <div class="col-lg-12">
          <h1>Github Repositories</h1>
        </div>
      </section>
      <section class="row">
        <div class="col-lg-12">
          <table-component :repos="repos"></table-component>
        </div>
      </section>
      <section class="row">
        <div class="col-lg-12 text-right">
          <button class="btn btn-primary" @click="getData">Get more repos</button>
        </div>
      </section>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import fetch from 'universal-fetch'

import HeaderComponent from './components/header/header.vue'
import FooterComponent from './components/footer/footer.vue'
import TableComponent from './components/table/table.vue'

export default {
  data () {
    return {
      repos: []
    }
  },
  methods: {
    getData () {
      const url = '/api/repos'
      const page = (this.repos.length / 10) + 1

      fetch(`${url}?page=${page}`)
        .then(response => response.json())
        .then(result => {
          result.data.forEach(data => {
            this.repos.push(data)
          })
        })
    }
  },
  components: { HeaderComponent, TableComponent, FooterComponent }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: 'HeitiTC', '微軟正黑體', '新細明體', sans-serif;
  }
</style> -->
