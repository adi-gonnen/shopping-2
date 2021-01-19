<template>
  <q-page class="q-mt-sm q-px-md">
    <p class="fs-20 q-mb-xs">בחרו רשימה</p>
    <q-select 
      v-model="selectedList" 
      :options="listOptions" 
      option-label="label" 
      option.value="value" 
      class="list-select q-mb-lg"
    >
      <template v-slot:selectedList>{{selectedList.label}}</template>
    </q-select>
    <q-separator class="q-mb-md"/>
    
    <div class="row">
      <p class="fs-20 q-mb-xs">הוסיפו קטגוריה</p>
      <q-btn class="add-btn add-category q-mx-md">+</q-btn>
    </div>
    <q-separator class="q-my-md"/>

    <p class="fs-20 q-mb-xs">ערכו קטגוריות</p>
    <q-list class="category-list">
      <q-item v-for="(n, idx) in setCategories" :key="idx" class="row items-center cursor-pointer">
        <i :class="[n.icon, n.color]"></i>
        <q-input v-model="setCategories[idx].name" class="category-name q-mb-none q-mx-sm"/>
      </q-item>
    </q-list>

    <q-btn class="add-btn">עדכן</q-btn>
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
    setCategories: []
  }),
  computed: {
    ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      lists: state => state.user.lists,
      categories: state => state.list.categories,
    }),
    listOptions() {
      return this.lists.map(list => {
          return {label: list.name, value: list.id }
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
    this.setCategories = this.categories.map(item => {
      return {name: item.name, icon: item.icon, color: item.color}
    })
    this.selectedList = this.listOptions[0]
  },
  methods: {
    ...mapActions({
      loadLists: "user/loadLists"
    })
  }
};
</script>

<style scoped lang="scss">
.list-select {
  height: 50px;
  min-width: 50%;
  max-width: 50%;
}
.category-list {
  margin-bottom: 25px;
}
.category-name::v-deep .q-field__control {
  height: 38px;
}
.add-category {
  width: 38px;
  height: 38px;
  font-size: 25px;
  &::v-deep {
    .q-btn__wrapper {
      min-height: unset;
      padding: 0;
    }
  }
}
</style>
