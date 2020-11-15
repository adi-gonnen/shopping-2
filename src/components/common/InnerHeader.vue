<template>
  <q-toolbar class="header row justify-between">
    <q-btn flat dense round icon="close" @click="back()"/>
    <div class="header-title items-center q-mx-md">{{title}}</div>
    <div class="empty-element"/>
  </q-toolbar>
</template>

<script>
import EditItem from "components/list/EditItem.vue";
import SelectList from "components/list/SelectList.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",
  props: ['origin'],
  components: { EditItem, SelectList },
  computed: {
    ...mapGetters({
      currentList: "list/currentList" || 'עדכן רשימה',
    }),
    ...mapState({
      auth: state => state.user.auth,
      items: state => state.list.items,
    }),
    title() {
      const isItem = this.$route.path.includes('item');
      return isItem ? this.currentList.name : 'עדכון רשימות';
    },
  },
  methods: {
    back() {
      window.history.back()
    }
  }
};
</script>

<style scoped lang="scss">
.header-title {
  font-size: 20px;
}
.empty-element {
  min-width: 33px;
}

</style>

