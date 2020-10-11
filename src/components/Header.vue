<template>
  <div class="header-container">
    <div>
      <q-toolbar :class="items && 'row justify-between'">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleMenu"
        />
          <select-list v-if="auth && items"/>
          <add-item v-if="auth && items"/>
        <q-toolbar-title v-else class="q-mx-md">רשימת קניות</q-toolbar-title>
      </q-toolbar>
    </div>
  </div>
</template>

<script>
import AddItem from "components/AddItem.vue";
import SelectList from "components/SelectList.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  components: { AddItem, SelectList },
  computed: {
    ...mapState({
      auth: state => state.list.auth,
      items: state => state.list.items
    })
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu')
    }
  }
};
</script>
