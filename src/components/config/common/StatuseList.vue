<template>
  <table class="table is-fullwidth">
    <thead>
    <tr class="is-selected">
      <th>Name</th>
      <th>Alias</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td>{{ item.name }}</td>
      <td>{{ item.alias }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'StatusList',
  props: ['items'],
}
</script>
