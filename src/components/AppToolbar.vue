<template>
    <v-ons-toolbar>
        <div class="left" name="left">
           
        </div>
        <div class="center">{{ title }}</div>

        <div class="right" name="right">
            
        </div>
    </v-ons-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "GitHub App"
    }
  }
};
</script>