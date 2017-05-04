<template lang="html">
  <div class="">
    <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Repository Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(repo, index) in repos">
        <td>{{ index + 1 }}</td>
        <td>{{ repo.name }}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  props: {
    repos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="css">

</style>
