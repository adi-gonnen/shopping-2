<template>
  <q-page class="flex q-mt-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <div v-else class="items-container full-width">
      <div v-if="items">
        <q-list>
          <div v-for="(category, idx) in sortedCategories" :key="idx">
            <draggable 
              class="category-list q-expansion-item full-width" 
              :list="category" 
              group="items" 
              @change="log"
            >
              <p class="category-header row items-center q-py-none q-mb-none">{{categoryName(idx)}}</p>
              <q-item v-for="item in category" :key="item.id" class="list-item-container q-pa-none">
                <list-item :item="item" :selected="selected" @markItems="markItems" @dblclick="moveToEdit"/>
              </q-item>
            </draggable>
          </div >
        </q-list>
        <!--<q-list class="category-list">
      <q-expansion-item 
        v-for="(category, index) in categoriesToShow" 
        :key="index" 
        :value="true" 
        dense-toggle 
        class="category-header row items-center q-py-none"
      >
        <template v-slot:header> -->
          <!-- <q-item-section class="item-label">
            <q-btn flat class="add-cat-btn" icon="add" @click.stop="addItem(category.id)"></q-btn>
          </q-item-section> -->
          <!-- <q-item-section avatar class="category-icon">
            <i :class="category.icon" :style="{color: category.color}"></i>
          </q-item-section>
          <q-item-section class="item-label">
            <p class="bold q-mb-none q-px-sm">{{category.name}}</p>
          </q-item-section>
        </template> -->

        <!-- <q-separator/>
        <q-list class="category-list">
          <q-item v-for="(item, idx) in itemsCategory(category.id)" :key="idx" class="list-item-container q-pa-none">
            <list-item :item="item" :selected="selected" @markItems="markItems" @dblclick="moveToEdit"/>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list> -->
    <!-- <p v-if="showFreeTitle" class="free-items-title bold q-py-xs q-px-md q-mb-sm">מוצרים נוספים:</p>
    <q-list class="category-list">
      <q-item v-for="(item, idx) in freeItems" :key="idx" class="list-item-container q-pa-none">
        <list-item :item="item" :selected="selected" @markItems="markItems" @dblclick="moveToEdit"/>
      </q-item>
    </q-list> -->

        <main-footer :selected="selected" @clear="clear" class="layout fixed-bottom"/>
      </div>
    </div>
    <div v-if="error" class="error-text q-pa-md">{{errorText}}</div>
  </q-page>
</template>

<script>
import { mapState,mapGetters, mapActions } from "vuex";
import Login from "components/common/Login.vue";
import Welcome from "components/common/Welcome.vue";
import ListItems from "components/list/ListItems.vue";
import ListItem from "components/list/ListItem.vue";
import draggable from "vuedraggable";

import CategoryItems from "components/list/CategoryItems.vue";
import MainFooter from "components/common/MainFooter.vue";

export default {
  name: "Sort",
  components: { ListItems, ListItem, CategoryItems, MainFooter, draggable },
  data: () => ({
    selected: [],
    // listItems: []
  }),
  computed: {
    ...mapGetters({
      categoryList: "list/categoryList"
    }),
    ...mapState({
      items: state => state.list.items,
      lists: state => state.user.lists,
      categories: state => state.list.categories,
      auth: state => state.user.auth,
      loading: state => state.list.loading,
      error: state => state.list.error
    }),
    sortedCategories() {
      return this.setCategoriesList()
    },
    categoryName() {
      return idx => {
        const id = this.sortedCategories[idx][0].category;
        if (id) {
          const category = this.categories.find(item => {return id === item.id})
          return category.name;
        }
        return null;
      }
    },
    // categoriesToShow() {
    //   return this.categories.filter(category => {
    //     return this.items.find((item) => {
    //       return category.id === item.category
    //     })
    //   })
    // },
    errorText() {
      switch (this.error) {
        case "add":
          return "תקלה- הפריט לא התווסף";
          break;
        case "delete":
          return "תקלה- הפריט/ים לא נמחק/ו";
          break;
        case "edit":
          return "תקלה בעריכת פריט";
          break;
        default:
          return "מצטערים, נראה שיש תקלה במערכת";
          break;
      }
    }
  },
  methods: {
    ...mapActions({}),
    markItems(array) {
      this.selected = array;
    },
    clear() {
      this.selected = [];
    },
    arrangeList(list) {
      this.listItems = list;
    },
    setCategoriesList() {
      const items = JSON.parse(JSON.stringify(this.items));
      const list = []
      this.categories.forEach(category => {
        const itemsArray = [];
        items.forEach(item => {
          if (item.category === category.id ) {
            itemsArray.push(item);
            // items.splice(idx, 1)
          }
        })
        // const itemsArray = items.filter(item => {
        //   return item.category === category.id
        // })
        if (itemsArray[0]) {
          list.push(itemsArray)
        }
      });
      return list;
    },
    changeLocation(event) {
      console.log('val', event)
    },
     log: function(evt) {
      console.log(evt);
    },
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
