<template>
  <div>
    {{message}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'loading...'
    }
  },
  
  async asyncData({ $axios }) {
    if (!process.static) {
      const { data } = await $axios.get('http://localhost:3000/api/simple')
      return data
    }
    
    return { message: 'Sadly does not work with API queries and static sites' }
  }
}
</script>