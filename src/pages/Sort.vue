<template>
  <q-page class="flex q-mt-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <sort-items v-else :categories="categories" :items="items"/>
  </q-page>
</template>

<script>
import { mapState,mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import SortItems from "components/list/Sort.vue";

export default {
  name: "Sort",
  components: { SortItems, draggable },
  data: () => ({
    itemsList: [],
    categoriesList: [],
    test: [{name: 'adi'}, {name: 'amir'}, {name: 'gonnen'}]
  }),
  computed: {
    ...mapGetters({
      categoryList: "list/categoryList"
    }),
    ...mapState({
      items: state => state.list.items,
      categories: state => state.list.categories,
      loading: state => state.list.loading,
    }),
  },
  methods: {
    ...mapActions({}),
    onChange(val) {
      console.log("change", val, this.list1, this.list2)
    }
  }
};
</script>

<style lang="scss">
.items-container {
  margin-bottom: 70px;
}
.q-list.category-list {
  margin-bottom: 15px;
}
.item {
  height: 40px;
}
.item-label.q-item__label {
  font-size: 20px;
  line-height: 32px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 77%;
  overflow: hidden;
}
.q-expansion-item > * {
  width: 100%;
  & .q-item:not(.list-item-container) {
    padding: 0;
    height: 25px;
    min-height: 25px;
    background-color: #f3e4c8;
  }
}
.category-icon {
  min-width: 35px;
}
.add-cat-btn {
  font-size: 12px;
}
.free-items-title {
  background-color: #f3e4c8;
  width: 100%;
}
</style>
