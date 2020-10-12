<template>
  <div class="row justify-between no-wrap">
    <q-btn flat class="edit-btn" :icon="icon" @click.stop="modal = true"/>
    <q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section>
          <q-input
            bg-color="white"
            outlined
            v-model="newItem.name"
            autofocus
            placeholder="הוסף פריט"
          />
          <q-input
            bg-color="white"
            outlined
            v-model="newItem.quantity"
            type="number"
            class="quan-input q-my-md"
          >
            <template v-slot:before>כמות:</template>
          </q-input>
          <q-btn
            flat
            :label="btnText"
            size="xl"
            color="white"
            class="add-btn full-width"
            @click="addItem"
          />
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
      return this.item ? 'edit' : 'add'
    }
  },
  mounted() {
    if (this.item) {
      this.newItem = JSON.parse(JSON.stringify(this.item));
    } else {
      this.newItem.quantity = 1;
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
      const func = this.item ? 'editItem' : 'addNewItem'
      this[func](this.newItem);
      this.modal = false;
    }
  }
};
</script>

<style lang="scss">
.q-card {
  margin-top: -230px;
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
}
</style>
