<template>
  <div class="full-width">
    <q-list class="lists-container full-width">
      <q-item
        v-for="list in lists"
        :key="list.id"
        tag="label"
        v-ripple
        @click.stop="toggleList(list)"
        :class="isSelected(list.id) && 'selected'"
        class="full-width q-pl-none"
      >
        <q-item-section class="item-label">
          <q-item-label>{{list.name}}</q-item-label>
          <q-icon v-if="isDefault(list.id)" name="star" color="primary" class="q-mx-sm"/>
        </q-item-section>
        <q-item-section avatar class="q-pa-none">
          <q-btn v-if="isSelected(list.id)" flat class="edit-btn" icon="edit" @click.stop="openEditList(list.id)"/>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="row justify-between fixed-bottom q-my-sm q-mx-md">
      <q-btn flat icon="add" class="add-btn" @click.stop="openEditList(null)"/>
    </div>
    <!-- delete/parentId/email -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EditLists",
  data: () => ({
    selected: {},
  }),
  computed: {
    ...mapState({
      lists: state => state.user.lists,
      defaultListId: state => state.user.defaultListId,
    }),
    isSelected() {
      return id => {
        return id === this.selected.id;
      };
    },
    isDefault() {
      return id => {
        return +id === +this.defaultListId;
      };
    },
    selectedList() {
      return this.lists.find(list => {
        return list.id === this.selected;
      });
    }
  },
  methods: {
    toggleList(list) {
      if (this.selected.id === list.id) {
        this.selected = {};
      } else {
        setTimeout(() => {this.selected = list}, 200);      
      }
    },
    openEditList(id) {
      const params = id ? id : 'add-list';
      this.$router.push(`/list/${params}`);
    }
  }
};
</script>

<style scoped lang="scss">
.q-item {
  font-size: 20px;
  border-bottom: 1px solid #000000;
  min-height: 55px;
  &::v-deep {
    .q-item__section {
      white-space: nowrap;
    }
  }
}
.item-label {
  flex-direction: row !important;
  justify-content: flex-start;
  align-items: center;
}
.empty-icon {
  min-width: 40px;
}
.selected {
  background-color: aquamarine;
}
.btns-container {
  width: 90%;
}
.add-btn {
  height: 50px;
  width: 100%;
  margin: auto;
}
</style>
