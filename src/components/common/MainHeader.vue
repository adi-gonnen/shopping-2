
<template>
  <q-toolbar :class="items && 'row justify-between'" class="header">
    <q-btn v-if="auth" flat dense round icon="menu" aria-label="Menu" @click="$emit('toggleMenu')"/>
    <select-list v-if="auth && items"/>
    <q-btn v-if="auth && items" flat class="edit-btn" icon="add" @click.stop="openEditItem"/>
    <q-toolbar-title v-else class="q-mx-md">רשימת קניות</q-toolbar-title>
  </q-toolbar>
</template>

<script>
import EditItem from "components/list/EditItem.vue";
import SelectList from "components/list/SelectList.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  components: { EditItem, SelectList },
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      items: state => state.list.items
    })
  },
  methods: {
    openEditItem() {
      this.$router.push('/add-item')
    },
  }
};
</script>

