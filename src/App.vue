<template>
  <nav>
    <router-link to="/">Описание</router-link> | 
    <router-link to="/task">Выполненное задание</router-link>
  </nav>
  <router-view/>
  <!-- <footer><a href="https://t.me/neluckoff">Dmitry Luckyanenko</a></footer> -->
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 20px 0;
}
</style>
