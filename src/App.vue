<template>
    <v-ons-page>
      <app-toolbar/>
      <div class="content">
        <app-search :query.sync="query">
          
        </app-search>

        <v-ons-list>
          <v-ons-list-header>Respositoris of {{ query }}</v-ons-list-header>
            <v-ons-list-item v-for="repo in repos" :key="repo">
            <div class="left">
              <img class="list-item__thumbnail" src="https://avatars3.githubusercontent.com/u/21221433?v=4">
            </div>
            <div class="center">
              <span class="list-item__title">{{ repo.name }}</span><span class="list-item__subtitle">{{ repo.description }}</span>

            </div>
          </v-ons-list-item>
        </v-ons-list>
        
      </div>
    </v-ons-page>
</template>

<script>
import AppToolbar from "./components/AppToolbar";
import AppSearch from "./components/AppSearch";
import { github } from "./services/GitHub.js";
import debounce from 'lodash/debounce'

export default {
  components: {
    AppToolbar,
    AppSearch
  },
  data() {
    return {
      query: "",
      repos: []
    };
  },
  watch: {
    query: debounce(function() {
      github.getRepos(this.query)
        .then((response) => {
          this.repos = response.data
          console.log(this.repos)
        }).catch((error) => {
          console.log(error)
        })
    }, 500)
  }
};
</script>
