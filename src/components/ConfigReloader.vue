<template>
  <div>
    <h3 class="title is-4">Config reloader</h3>

    <div class="column">
      <ul class="list">
        <li>
          <a class="is-link" id="contacts">Reload Contacts</a>
        </li>
        <li>
          <a class="is-link" id="commands">Reload Commands</a>
        </li>
        <li>
          <a class="is-link" id="hosts">Reload Hosts</a>
        </li>
        <li>
          <a class="is-link" id="services">Reload Services</a>
        </li>
        <li>
          <a class="is-link" id="time_periods">Reload Time perdiods</a>
        </li>
        <li>
          <hr>
        </li>
        <li>
          <a class="is-link" id="cache">Reset cache</a>
        </li>
      </ul>
    </div>

    <article class="column">
      <div id="reload-info"></div>
    </article>
  </div>
</template>

<script>

export default {
  name: 'ConfigReloader',
  mounted() {
    const info_block = document.getElementById('reload-info');
    document.querySelectorAll('.is-link')
        .forEach(function (link) {
          link.addEventListener('click', function (el) {
            const entity = el.target.id;
            if (entity) {
              info_block.innerText = 'Start reloading ' + entity + ' ...';
              this.$http
                  .get(`${this.$apiBaseURL}/${entity}/api/reload_config`)
                  .then(resp => {
                    info_block.innerText = 'Reloading ' + entity + ' completed' + "\n" + JSON.stringify(resp.data);
                  })
                  .catch(error => {
                    info_block.innerText = 'Error reloading ' + entity + "\n" + error;
                    this.errored = true
                  })
                  .finally(() => this.loading = false)
            }
          })
        })
  }
}
</script>
