<template>
  <div class="home">
    <label for class="search-bar">
      <input v-model="search" type="text" placeholder="搜尋歌曲..." />
      <button @click="getSearch">搜尋</button>
    </label>

    <ul class="search-result">
      <!--eslint-disable-next-line-->
      <li v-for="(list,idx) in kkboxData">
        <!-- <a :href="`https://www.youtube.com/watch?v=${ytData[idx].id.videoId}`" target="_blank"> -->
        <span>ID: {{idx}}</span>
        <span>{{ list.name }}</span>
        <span>{{ ytData[idx] }}</span>
        <!-- </a> -->
      </li>
    </ul>
  </div>
</template>


<script>
import qs from "querystring";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      token: "",
      kkboxData: "",
      search: "浪流連",
      ytData: ""
    };
  },
  methods: {
    getToken() {
      const config = {
        headers: {
          Accpet: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      const oauth = {
        grant_type: "client_credentials",
        client_id: "3330ede1dc43bc6bb92afd2fd22c9ef7",
        client_secret: "4ebd081fba2fa3741486924413d0dd34"
      };

      this.$http.post("/token", qs.stringify(oauth), config).then(res => {
        this.token = res.data.access_token;
        this.getSearch();
      });
    },
    getSearch() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };

      axios
        .get(
          `https://api.kkbox.com/v1.1/search?q=${this.search}&type=album&territory=TW`,
          config
        )
        .then(res => {
          this.kkboxData = res.data.albums.data;
          this.getYT();
        });
    },
    getYT() {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBBTrPCQBahYQSP0cEMAsQGvcurm1Q7GP4&part=snippet&type=video&q=${this.search}`
        )
        .then(res => {
          this.ytData = res.data.items;
          console.log(res.data.items);
        });
    }
  },
  created() {
    this.getToken();
  }
};
</script>


<style>
.search-bar {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-bar button {
  width: 100%;
  height: 50px;
  border-radius: 50px;
  background-color: #fff;
  border: none;
  max-width: 200px;
  font-size: 18px;
  color: #254cc9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.search-result {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-result li {
  text-align: left;
}

.search-result a {
  color: #fff;
  text-decoration: none;
}
.search-bar input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  border: none;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>