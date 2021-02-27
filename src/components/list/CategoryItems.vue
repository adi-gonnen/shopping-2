<template>
  <div class="items-container column full-width">
    <q-list class="category-list">
      <q-expansion-item 
        v-for="(category, index) in categoriesToShow" 
        :key="index" 
        :value="true" 
        dense-toggle 
        class="category-header row items-center q-py-none"
      >
        <template v-slot:header>
          <q-item-section avatar class="category-icon">
            <i :class="category.icon" :style="{color: category.color}"></i>
          </q-item-section>
          <q-item-section class="item-label">
            <p class="bold q-mb-none q-px-sm">{{category.name}}</p>
          </q-item-section>
          <q-item-section class="item-label">
            <q-btn flat class="add-cat-btn" icon="add" @click.stop="addItem(category.id)"></q-btn>
          </q-item-section>
        </template>

        <q-separator/>
        <q-list class="category-list">
          <q-item v-for="(item, idx) in itemsCategory(category.id)" :key="idx" class="list-item-container q-pa-none">
            <list-item :item="item" :selected="selected" @markItems="markItems" @dblclick="moveToEdit"/>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
    <p v-if="showFreeTitle" class="free-items-title bold q-py-xs q-px-md q-mb-sm">מוצרים נוספים:</p>
    <q-list class="category-list">
      <q-item v-for="(item, idx) in freeItems" :key="idx" class="list-item-container q-pa-none">
        <list-item :item="item" :selected="selected" @markItems="markItems" @dblclick="moveToEdit"/>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import ListItem from "components/list/ListItem.vue";
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  name: "CategoryItems",
  components: { ListItem, draggable },
  props: ["items", "categories"],
  data: () => ({
    selected: []
  }),
  computed: {
    categoriesToShow() {
      return this.categories.filter(category => {
        return this.items.find((item) => {
          return category.id === item.category
        })
      })
    },
    freeItems() {
      return this.items.filter(item => {
        return !item.category
      })
    },
    itemsCategory() {
      return id => {
        return this.items.filter(item => {
          return item.category === id;
        });
      };
    },
    category() {
      return id => {
        return this.categories.find(item => {
          return (item.id = id);
        });
      };
    },
    showFreeTitle() {
      return this.categoriesToShow[0] && this.freeItems[0]
    }
  },
  methods: {
    markItems(id) {
      const idx = this.selected.findIndex(item => {
        return item === id;
      });
      if (idx !== -1) {   //item already marked        
        this.selected.splice(idx, 1);
      } else {
        this.selected.push(id);
      }
      this.$emit("markItems", this.selected);
    },
    addItem(category) {
      this.$router.push(`add-item/${category}`)
    },
    moveToEdit() {
      this.$router.push(`edit-item/${this.item.id}`)
    },
  }
};
</script>

<style lang="scss">
@import "../../assets/colors.scss";
//
// 4. prepare all items in array of arrays
// 5. put items in dragble
// 6. drag items should change their category
// 7. after all works - set regular list on home page
// 8. fix edit category bug
.items-container {
  margin-bottom: 70px;
}
.q-list.category-list {
  margin-bottom: 15px;
}
.q-item {
  // height: 40px;
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

