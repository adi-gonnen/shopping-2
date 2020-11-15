<template>
  <div class="full-width">
    <q-list class="lists-container full-width">
      <q-item
        v-for="list in lists"
        :key="list.id"
        tag="label"
        v-ripple
        @click.stop="openEditList(list.id)"
        class="full-width q-pl-none"
      >
        <q-item-section class="item-label">
          <q-item-label>{{list.name}}</q-item-label>
          <q-icon v-if="isDefault(list.id)" name="star" color="primary" class="q-mx-sm"/>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="fixed-bottom layout q-my-sm q-mx-md">
      <q-btn flat icon="add" class="add-btn" @click.stop="openEditList()"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EditLists",
  data: () => ({}),
  computed: {
    ...mapState({
      lists: state => state.user.lists,
      defaultListId: state => state.user.defaultListId,
    }),
    isDefault() {
      return id => {
        return +id === +this.defaultListId;
      };
    },
  },
  methods: {
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
.btns-container {
  width: 90%;
}
.add-btn {
  height: 50px;
  width: 100%;
  margin: auto;
}
</style>
