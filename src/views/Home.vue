<template>
  <div class="Home">
    <ul class="song-list">
      <!--eslint-disable-next-line-->
      <li v-for="list in kkboxData">
        <div class="group" :data-id="list.id" @click="playIframe">
          <div class="pic">
            <img :src="list.images[0].url" alt />
          </div>
          <div class="infor">
            <h2>{{ list.title }}</h2>
            <span>{{ list.description }}</span>
          </div>
        </div>
      </li>
    </ul>

    <div class="iframe-box" v-if="iframeShow == true">
      <iframe
        :src="`https://widget.kkbox.com/v1/?id=${iframeId}&type=playlist&terr=TW&lanf=TC&autoplay=true
     `"
        width="100%"
        height="300"
        frameborder="0"
      ></iframe>
    </div>
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
      iframeShow: false,
      iframeId: ""
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
        this.getHitPlaylist();
      });
    },
    getHitPlaylist() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };

      axios
        .get(
          "https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW",
          config
        )
        .then(res => {
          this.kkboxData = res.data.data;
        });
    },
    playIframe(event) {
      this.iframeShow = true;
      this.iframeId = event.currentTarget.getAttribute("data-id");
    }
  },
  created() {
    this.getToken();
  }
};
</script>

<style>
.iframe-box {
  margin: 40px 0;
}
.song-list {
  display: flex;
  width: 100%;
  flex-flow: wrap;
  align-items: stretch;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.song-list .group {
  margin: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #fff;
  overflow: hidden;
  height: 100%;
  cursor: pointer;
}

.song-list li {
  flex: 25%;
}

.song-list .infor {
  padding: 20px;
}

.song-list img {
  max-width: 100%;
  width: 100%;
}

.song-list h2 {
  font-size: 18px;
  margin: 0;
  margin-bottom: 20px;
}

.song-list span {
  font-size: 14px;
}
</style>