<template>
  <div class="row justify-between no-wrap">
    <q-btn flat label="+" size="xl" color="white" @click="modal=true"/>
    <q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>

        <q-card-section>
          <q-input bg-color="white" outlined v-model="newItem" autofocus placeholder="הוסף פריט"/>
          <q-input
            bg-color="white"
            outlined
            v-model="quantity"
            type="number"
            class="quan-input q-my-md"
          >
            <template v-slot:before>כמות:</template>
          </q-input>
          <q-btn
            flat
            label="+"
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
  data: () => ({
    newItem: null,
    quantity: 1,
    modal: false
  }),
  methods: {
    ...mapActions({
      addNewItem: "list/addNewItem"
    }),
    addItem() {
      if (!this.newItem) {
        return;
      }
      const item = {
        name: this.newItem,
        quantity: this.quantity
      };
      this.addNewItem(item);
      this.newItem = null;
      this.quantity = 1;
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
