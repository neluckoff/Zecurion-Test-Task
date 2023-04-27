<template>
    <div class="home">
      <TaskTable />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import TaskTable from '@/components/TaskTable.vue'
  
  export default {
    name: 'HomeView',
    components: {
      TaskTable
    }
  }
  </script>