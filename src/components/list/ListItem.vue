<template>
  <div
    :class="{ 'selected': isSelected }"
    class="item-container row full-width justify-between q-px-sm"
    @click="toggleSelected"
    @dblclick="moveToEdit"
  >
    <q-item-label class="item-label q-mt-xs col-10">{{item.name}}</q-item-label>
    <div class="row justify-end items-center col-2">
      <q-item-label v-if="isSelected">
        <q-btn flat class="edit-btn q-ml-sm" icon="edit" @click.stop="moveToEdit"/>
      </q-item-label>
      
      <!-- <q-item-label v-if="!item.category">
        <q-btn flat class="edit-btn" @click.stop="showCategories">
          <i class="fas fa-sort-amount-down"></i>
        </q-btn>
      </q-item-label> -->
      <q-item-label class="item-label">{{item.quantity}}</q-item-label>
    </div>

    <q-dialog v-model="dialog">
      <q-card class="list-container">
        <q-card-section class="q-pa-none">
          <inner-header origin="dialog" @close="dialog = false"/>
        </q-card-section>
        <q-card-section class="">
         <q-list class="categories-list scroll column">
          <q-item 
            v-for="(category, idx) in fullCategories" 
            :key="idx" 
            class="cat-item row items-center justify-between q-px-sm q-mb-xs" 
            
            >
            <div class="row items-center full-width" @click="selectCategory(category)">
              <i :class="category.icon" :style="{color: category.color}" class="q-ml-sm"></i>
              <p class="category-name q-mb-none">{{category.name}}</p>
            </div>
          </q-item>
         </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import InnerHeader from 'components/common/InnerHeader.vue';
import { mapState, mapActions } from "vuex";

export default {
  name: "ListItem",
  components: { InnerHeader },
  props: ["item", "selected"],
  data: () => ({
    dialog: false
  }),
  computed: {
     ...mapState({
      categories: state => state.list.categories,
      fullCategories: state => state.list.fullCategories,
    }),
    isSelected() {
      return this.selected.find(item => {
        return item === this.item.id;
      });
    },

  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
      getItems: "list/getItems"
    }),
    toggleSelected() {
      this.$emit("markItems", this.item.id);
    },
    moveToEdit() {
      this.$router.push(`edit-item/${this.item.id}`)
    },
    showCategories() {
      this.dialog = true;
    },
    async selectCategory(category) {
      const item = {
        ...this.item,
        category: category.id
      }
      this.dialog = false;
      await this.editItem(item);
      await this.getItems();
    }
  }
};
</script>
<style scoped lang="scss">
.item-container {
  border-bottom: 1px solid #000000;
}
.selected {
  background-color: aquamarine;
}
.item-label.q-item__label {
  font-size: 20px;
  line-height: 32px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  // max-width: 77%;
  overflow: hidden;
}
.q-btn.edit-btn {
  &::v-deep {
    .q-btn__wrapper {
      padding: 0;
    }
  }
}
.q-dialog {
  direction: rtl;;
}
.list-container {
 min-width: 90%;
}
.categories-list {
  direction: rtl;
}
.cat-item {
  background-color: #f3e4c8;
  min-height: 38px;
}
</style>
