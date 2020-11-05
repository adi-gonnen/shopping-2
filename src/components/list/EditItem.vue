<template>
  <div class="row justify-between no-wrap">
    <q-btn flat class="edit-btn" :icon="icon" @click.stop="modal = true"/>

    <q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-input outlined v-model="newItem.name" autofocus placeholder="הוסף פריט"/>
          <q-input outlined v-model="newItem.quantity" type="number" class="quan-input q-my-md"/>
        </q-card-section>
        <q-card-section>
          <q-btn flat size="xl" class="add-btn" @click="addItem">{{btnText}}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddItem",
  props: ["item"],
  data: () => ({
    newItem: {},
    modal: false
  }),
  computed: {
    btnText() {
      return this.item ? "עדכן פריט" : "הוסף פריט";
    },
    icon() {
      return this.item ? "edit" : "add";
    }
  },
  mounted() {
    if (this.item) {
      this.newItem = JSON.parse(JSON.stringify(this.item));
    } else {
      this.newItem = { quantity: 1, name: "" };
    }
  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
      addNewItem: "list/addNewItem"
    }),
    addItem() {
      if (!this.newItem.name) {
        return;
      }
      const func = this.item ? "editItem" : "addNewItem";
      this[func](this.newItem);
      this.modal = false;
      if (!this.item) {
        this.newItem = { quantity: 1, name: "" };
      }
    }
  }
};
</script>

<style lang="scss">
.q-card {
  margin-top: -200px;
  width: 100%;
  direction: rtl;
}
.quan-input {
  font-size: 20px;
  &::v-deep {
    .q-field__inner {
      margin: 0 10px;
    }
    .q-field__before {
      padding: 0;
    }
  }
}
.add-btn {
  background-color: $primary;
  color: #fff;
  width: 100%;
}
</style>