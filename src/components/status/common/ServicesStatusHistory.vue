<template>
  <table class="table is-fullwidth is-bordered">
    <thead>
    <tr class="is-selected">
      <th class="id-col">#</th>
      <th>Status information</th>
      <th class="ret-code-col" v-if="hide_ret_code !== true">Ret. code</th>
      <th class="status-col">Status</th>
      <th class="datetime-col">Check Date/Time</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td>{{ index + 1 }}</td>
      <td>{{ item.output }}</td>
      <td v-if="hide_ret_code !== true">{{ item.ret_code }}</td>
      <td :class="'col-status-' + item.status">{{ item.status }}</td>
      <td>{{ item.created_at }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ServicesStatusHistory',
  props: ['items', 'hide_ret_code']
}
</script>

<style scoped >
table th.id-col {
  width: 3em;
}
table tr td.col-status-OK {
  /* background: #7FFF00; */
}
table tr td.col-status-UP {
  /* background: #7FFF00; */
}
table tr td.col-status-DOWN {
  background: #f87a7a;
}
table tr td.col-status-WARNING {
  background: #fc994c;
}
table tr td.col-status-CRITICAL {
  background: #f87a7a;
}
table tr td.col-status-BLOCKER {
  background: #e90d0d;
}
table tr td.col-hard-status-true {
  color: #e90d0d;
  font-weight: bold;
}
table tr td.col-status-PENDING,
table tr td.col-status-UNKNOWN {
  background: #b0abab;
}

table tr th.datetime-col {
  width: 12em;
}
table tr th.status-col {
  width: 10em;
}
</style>
