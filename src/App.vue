<template>
    <v-ons-page>
      <app-toolbar/>
      <div class="content">
        <app-search :query.sync="query"></app-search>

        <div class="container" v-if="showProgress">
           <v-ons-progress-circular indeterminate id="progress"></v-ons-progress-circular>
        </div>

        <v-ons-list v-if="showList">
          <v-ons-list-header>                
            Respositoris of {{ query }}
          </v-ons-list-header>
            <v-ons-list-item  v-for="repo in repos" :key="repo.id">
            <div class="left">
              <img class="list-item__thumbnail" :src=" repo.owner.avatar_url">
            </div>
            <div class="center">
              <span class="list-item__title">{{ repo.name }}</span><span class="list-item__subtitle">{{ repo.description }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
        <empty-state v-if="!showProgress && !repos.length" type="repository" /> 
      </div>
    </v-ons-page>
</template>

<script>
import AppToolbar from "./components/AppToolbar";
import AppSearch from "./components/AppSearch";
import { github } from "./services/GitHub.js";
import debounce from 'lodash/debounce'
import EmptyState from './components/EmptyState'

export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState
  },
  data() {
    return {
      query: "",
      repos: [],
      showProgress: false
      };
  },
  computed: {
    showList() {
      return this.repos.length > 0
    }
  },
  watch: {
    
    query: debounce(function() {
      this.showProgress = true
      github.getRepos(this.query)
        .then((response) => {
          this.repos = response.data
          console.log(this.repos)
        }).catch((error) => {
          console.log(error)
        }).finally(() => this.showProgress = false)
    }, 500)
  }
};
</script>

<style>

.container {
  text-align: center;
}

#progress {
  width: 100px;
  height: 100px;
  margin: 1.5rem
}
  
</style>

