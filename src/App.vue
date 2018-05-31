<template>
    <v-ons-page>
      <app-toolbar/>
      <div class="content">
        <app-search :query.sync="query">
          
        </app-search>
        
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
