<template>
  <v-card
    outlined
    flat
    height="auto"
    width="256"
    class="mx-auto float-left"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Sub Menu
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <router-link tag="span" :to=item.toLink>
          <v-list-item-content>
            <p>{{ item.title }}</p>
          </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>

  import routeList from '@/views/pages/oblik/routeList';

  export default {
    data () {
      return {
        items: routeList,
        right: null,
      }
    },
  }
</script>