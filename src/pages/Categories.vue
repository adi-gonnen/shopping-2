<template>
  <q-page class="q-mt-sm q-px-md">
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
    
    <div class="page-section row q-mb-md">
      <p class="fs-20 q-mb-xs">הוסיפו קטגוריה</p>
      <q-btn class="add-btn add-category q-mx-md" @click="addCategory">+</q-btn>
    </div>

    <div class="page-section q-mb-md">
      <p class="fs-20 q-mb-xs">ערכו קטגוריות</p>
      <q-list class="category-list">
        <q-item v-for="(n, idx) in setCategories" :key="idx" class="cat-item row items-center cursor-pointer q-mb-xs">
          <i :class="n.icon" :style="{color: n.color}" @click="selectItem(n.id)"></i>
          <!-- <div v-if="!n.icon" @click="selectItem(n.id)" class="icon-placeholder"/> -->
          <q-input v-model="setCategories[idx].name" class="category-name q-mb-none q-mx-sm" @input="setName(idx)"/>
        </q-item>
      </q-list>
    </div>

    <div class="row justify-between no-wrap q-pa-sm">
      <q-btn class="add-btn update-btn col-5" @click="updateCategory">עדכן</q-btn>
      <q-btn :loading="load" class="update-btn bg-white col-5" icon="delete" @click="deleteItems">
        <q-badge v-if="selected.length" color="red" floating>{{selected.length}}</q-badge>
        <template v-slot:loading>
          <q-spinner class="load-spinner q-my-sm"/>
        </template>
    </q-btn>
  </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditLists from "components/list/EditLists.vue";

export default {
  name: "Categories",
  components: { EditLists },
  data: () => ({
    selectedList: null,
    setCategories: [],
    idxList: [],
    selected: [],
    load: false
  }),
  computed: {
    ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      listId: state => state.list.listId,
      lists: state => state.user.lists,
      categories: state => state.list.categories,
    }),
    listOptions() {
      return this.lists?.map(list => {
          return {label: list.name, value: list.id }
        });
    },
    currentList() {
      return this.listOptions.find(list => {
        return this.listId === list.value;
      }); 
    },
    errorText() {
       switch (this.error) {
        case "add":
          return "תקלה- הרשימה לא התווספה";
          break;
        case "delete":
          return "תקלה- הרשימה לא נמחקה";
          break;
        case "edit":
          return "תקלה בעריכת רשימה";
          break;
        default:
          return "מצטערים, נראה שיש תקלה במערכת";
          break;
      }
    }
  },
  async mounted() {
    if (!this.lists) {
      await this.loadLists();
    }
    this.updateCategories()
    this.selectedList = this.currentList;
  },
  methods: {
    ...mapActions({
      loadLists: "user/loadLists",
      getItems: "list/getItems",
      setCategory: "list/updateCategory",
      deleteCategory: "list/deleteCategory",
    }),
    async changeSelect(item) {
      await this.getItems(item.value);
      this.updateCategories()
    },
    updateCategories() {
      this.setCategories = this.categories
    },
    addCategory() {
      this.$router.push('/categories/add')
    },
    async updateCategory() {
      const cateoriesIdx = this.idxList.filter((v, i, a) => a.indexOf(v) === i)
      for (let i = 0; i < cateoriesIdx.length; i++) {
        const idx = cateoriesIdx[i];
        const category = { ...this.categories[idx] }
        category.name = this.setCategories[idx].name
        await this.setCategory(category)
      }
    },
    async deleteItems() {
      if (!this.selected.length) {
        return 
      }
      this.load = true
      for (const id of this.selected) {
        await this.deleteCategory(id);
      }
      this.load = false
    },
    selectItem(id) {
      const idx = this.selected.findIndex(item => {
        return item === id;
      });
      if (idx !== -1) {       //item already marked
        this.selected.splice(idx, 1);
      } else {
        this.selected.push(id);
      }
    },
    setName(idx) {
      this.idxList.push(idx)
    }
  }
};
</script>

<style scoped lang="scss">
.page-section {
  border: 1px solid #000000;
  padding: 8px;
}
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
.category-list {
  margin-bottom: 25px;
}
.cat-item {
  background-color: #f3e4c8;
  min-height: 48px;
}
.category-name::v-deep .q-field__control {
  height: 38px;
}
.add-category {
  width: 38px;
  height: 38px;
  font-size: 23px;
  &::v-deep {
    .q-btn__wrapper {
      min-height: unset;
      padding: 0;
    }
  }
}
.load-spinner {
  margin: 4px auto;
}
// .icon-placeholder {
//   min-width: 40px;
//   min-height: 20px;
//   background-color: red;
// }
</style>
