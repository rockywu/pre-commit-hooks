<template>
  <div>
    <div v-for="item in items"></div>
  </div>

</template>
<script>
export default {
  name: 'App',
  data: function () {
    return {
      name: 'World',
      items: [
        {id: 1, name: 'a'},
        {id: 2, name: 'b'},
        {id: 3, name: 'c'}
      ]
    }
  },
  methods: {
    onClick () {
      // do something.
    },
    name1 () {}
  }
}
</script>
