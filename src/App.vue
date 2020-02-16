<template>
  <div id="app">
    <div class="container">
      <h1>想要聽 Youtube</h1>
      <!-- link -->
      <div class="menu">
        <router-link :to="{path: '/home'}" exact>排行榜歌曲列表</router-link>
        <router-link :to="{path: '/search'}" exact>搜尋歌單</router-link>
      </div>

      <!-- View -->
      <router-view></router-view>
    </div>
  </div>
</template>


<style>
html {
  background: linear-gradient(-20deg, #7b2aa9, #254cc9 31%, #257ec9);
}
body,
html {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  min-height: 100%;
}

.menu a:before {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 0;
  width: 1px;
  height: 10px;
  background-color: #fff;
}

.menu a:last-child::before {
  display: none;
}

.menu {
  margin-bottom: 50px;
}

.menu a {
  position: relative;
  padding: 0 10px;
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  opacity: 0.5;
  transition: 0.5s ease;
}

.menu a:hover,
.menu a.active {
  opacity: 1;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 40px;
  font-weight: bold;
  color: antiquewhite;
  opacity: 0.3;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>