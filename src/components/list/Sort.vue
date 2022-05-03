<template>
  <div class="row justify-between full-width no-wrap q-px-md">
    <!-- items list -->
    <draggable :list="itemsList" group="item" @change="onChange" class="col-5">
      <p v-for="item in itemsList" :key="item.id" class="item-list q-ml-sm">{{item.name}}</p>
    </draggable>

    <!-- category list -->
    <div class="column col-7">
      <div 
        v-for="(category, idx) in categoriesList" 
        :key="idx" class="category-container"
        @touchstart="showCategory = idx" 
        @mouseover="showCategory = idx"
        @touchend="showCategory = null"
        @mouseleave="showCategory = null"
      >
        <div class="row items-center no-wrap q-mb-md">
          <i :class="category.icon" :style="{color: category.color}" class="q-mx-sm"></i>
          <p class="category-name q-mb-none">{{category.name}}</p>
        </div>
        <draggable :list="category.items" group="item" @change="onChange(category, $event)">
          <div v-show="showCategory === idx">
            <p v-for="item in category.items" :key="item.id" class="item-list q-mb-md q-px-sm">{{item.name}}</p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import CategoryItems from "components/list/CategoryItems.vue";

export default {
  name: "SortItems",
  components: { CategoryItems, draggable },
  props: ['categories', 'items'],
  data: () => ({
    itemsList: [],
    categoriesList: [],
    showCategory: null
  }),
  computed: {
  },
  mounted() {
    this.setCategories()
    this.itemsList = JSON.parse(JSON.stringify(this.items)).filter((item) => !item.category);
  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
    }),
    setCategories() {
      this.categories.forEach((category => {
        const items = this.items.filter((i) => i.category === category.id)
        const item = {...category, items}
        this.categoriesList.push(item)
      }))
    },
    onChange(category, val) {
      if (!val) {
        return
      }
      let item
      if (val.added) {
        item = JSON.parse(JSON.stringify(val.added.element))
        item.category = category.id;
      } else if (val.removed) {
        item = JSON.parse(JSON.stringify(val.removed.element))
        item.category = null;
      }
      this.editItem(item);
    }
  }
};
</script>

<style lang="scss">
.category-name {
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  // max-width: 77%;
  overflow: hidden;
}
.category-container {
  border-bottom: 1px solid #dbdbdb;
}
.item-list {
  cursor: grabbing;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
