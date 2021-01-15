<template>
  <div>
    <q-select
      v-model="selected"
      :options="lists"
      option-value="id"
      option-label="name"
      behavior="menu"
      @input="changeSelect"
    >
      <template v-slot:selected>{{selected.name}}</template>
    </q-select>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "SelectList",
  data: () => ({
    selected: {}
  }),
  computed: {
    ...mapGetters({
      currentList: "list/currentList",
    }),
    ...mapState({
      lists: state => state.user.lists
    })
  },
  mounted() {
    if (this.lists) {
      this.selected = this.currentList;
    }
  },
  methods: {
    ...mapActions({
      getItems: "list/getItems"
    }),
    changeSelect(value) {
      this.getItems(value.id);
    }
  }
};
</script>

<style scoped lang="scss">
.q-select {
  &::v-deep {
    .q-field__native {
      color: white;
      margin: 0 20px;
      font-size: 20px;
    }
    .q-select__dropdown-icon {
      color: white;
    }
  }
}
</style>
