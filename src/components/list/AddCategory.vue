<template>
  <div class="full-width">
     <div class="page-section q-mb-md">
      <p class="fs-20 q-mb-xs">בחרו רשימה</p>
      <q-select 
        v-model="selectedList" 
        :options="listOptions" 
        option-label="label" 
        option.value="value" 
        heigh="30px"
        class="list-select q-mb-lg"
        @input="changeSelect"
      >
        <template v-slot:selectedList>{{selectedList.label}}</template>
      </q-select>
    </div>

    <q-list class="categories-list scroll column">
      <q-item v-for="(category, idx) in setCategories" :key="idx" class="cat-item row items-center justify-between q-pa-sm q-mb-xs">
        <div class="row items-center">
            <i :class="category.icon" :style="{color: category.color}" class="q-ml-sm"></i>
            <p class="category-name q-mb-none">{{category.name}}</p>
          </div>
          <div class="">
            <q-toggle 
              v-model="category.active" 
              size="sm" 
              val="battery" 
              @input="toggleCategory($event, category.icon)"/>
          </div>
      </q-item>
    </q-list>

    <div class="footer-container fixed-bottom layout">
      <q-btn flat size="xl" class="add-btn q-ma-sm" @click="updateCategory">עדכן</q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AddCategory",
  data: () => ({
    // categories: [{ color: 'black', name: "" },
    selectedList: null,
    setCategories: []
  }),
  computed: {
     ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      listId: state => state.list.listId,
      lists: state => state.user.lists,
      categories: state => state.list.categories,
      fullCategories: state => state.list.fullCategories,
    }),
    listOptions() {
      return this.lists.map(list => {
          return {label: list.name, value: list.id }
        });
    },
    currentList() {
      return this.listOptions.find(list => {
        return this.listId === list.value;
      }); 
    },
    categoryColor() {
      return color => {
        return color === 'white' ? 'gainsboro' : color;
      }
    }
  },
  // watch: {
  //   categories: {
  //     handler(val) {
  //       this.addNewLine();
  //     },
  //     deep: true
  //   }
  // },
  async mounted() {
    if (!this.lists) {
      await this.loadLists();
    }
    this.setCategories = JSON.parse(JSON.stringify(this.fullCategories));
    this.selectedList = this.currentList;
  },
  methods: {
    ...mapActions({
      addItem: "list/addNewItem",
      getItems: "list/getItems",
      loadLists: "user/loadLists",
      changeCategoryValue: "list/changeCategoryValue",
    }),
    async changeSelect(item) {
      await this.getItems(item.value);
      this.setCategories = JSON.parse(JSON.stringify(this.fullCategories));
      // this.updateCategories()
    },
    //  updateCategories() {
    //   this.setCategories = this.fullCategories.map(item => {
    //     return {name: item.name, icon: item.icon, color: item.color, active: true}
    //   })
    // },
    toggleCategory(event, icon) {
      this.changeCategoryValue({val: event, icon})
    },
    async updateCategory() {
      // this.setCategories()
      // this.categories = [{ color: 'black', name: "" }]
      window.history.back();
    }
  }
};
</script>

<style lang="scss">
.list-select {
  height: 50px;
  min-width: 50%;
  max-width: 50%;
  &::v-deep {
    .q-field--auto-height .q-field__native {
       min-height: 30px;
    }
  }
}
.cat-item {
  background-color: #f3e4c8;
  min-height: 38px;
}
.q-item__label {
  font-size: 17px;
}
.q-toggle {
  &::v-deep {
    .q-toggle__inner {
      padding: 0;
    }
  }
}
.footer-container {
  width: 542px;
}
.add-btn {
  background-color: $primary;
  color: #fff;
  width: 98%;
  &::v-deep {
    & .q-btn__wrapper {
      min-height: 40px;
    }
  }
}
</style>
