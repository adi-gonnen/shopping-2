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
          <edit-list v-if="isSelected(list.id)" :list="list"/>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="btns-container row justify-between fixed-bottom no-wrap q-my-sm q-mx-md">
      <edit-list/>
      <q-btn color="primary" class="lists-btn" icon="delete" @click="deleteModal = true"/>
    </div>

    <!-- <q-dialog v-model="deleteModal">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm q-mb-lg">האם את/ה בטוח/ה שברצונך למחוק?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="מחק" color="primary" class="q-mx-sm" @click="onDeleteList"/>
          <q-btn label="ביטול" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditList from "components/EditList.vue";

export default {
  name: "EditLists",
  components: { EditList },
  data: () => ({
    selected: {}
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
  async mounted() {
    if (!this.list) {
      await this.loadLists();
    }
  },
  methods: {
    ...mapActions({
      loadLists: "user/loadLists"
    }),

    toggleList(list) {
      if (this.selected.id === list.id) {
        this.selected = {};
      } else {
        setTimeout(() => {this.selected = list}, 200);      
      }
    },

    async onDeleteList() {
      console.log("list select", this.selected);
      // this.setLoading(false);
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
.lists-btn {
  height: 50px;
  width: 45%;
}
</style>
