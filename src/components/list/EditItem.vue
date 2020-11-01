<template>
  <div class="full-width">
    <!-- <q-btn flat class="edit-btn" :icon="icon" @click.stop="openEditItem"/> -->
    <div v-for="n in itemsCount" :key="n" class="row no-wrap q-mb-lg">
      <q-input
        outlined
        v-model="newItem[n].name"
        autofocus
        placeholder="הוסף פריט"
        class="name-input"
      />
      <q-input outlined v-model="newItem[n].quantity" type="number" class="quan-input q-mr-md"></q-input>
      <q-btn v-if="!item" flat class="add-item q-ml-sm" icon="add" @click.stop="addNewItem"/>
    </div>
    <q-btn flat size="xl" class="add-btn full-width" @click="addItem">{{btnText}}</q-btn>
    <!-- <q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="newItem.name" autofocus placeholder="הוסף פריט"/>
          <q-input outlined v-model="newItem.quantity" type="number" class="quan-input q-my-md">
            <template v-slot:before>כמות: &nbsp;</template>
          </q-input>
          <q-btn flat size="xl" class="add-btn full-width" @click="addItem">{{btnText}}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddItem",
  props: ["item"],
  data: () => ({
    newItem: [null, {}],
    itemsCount: 1,
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
      this.newItem[1] = JSON.parse(JSON.stringify(this.item));
    } else {
      this.newItem[1] = { quantity: 1, name: "" };
    }
  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
      addItem: "list/addNewItem"
    }),
    openEditItem() {
      const params = this.item ? this.item.id : "add-item";
      this.$router.push(`/item/${params}`);
    },
    addNewItem() {
      this.itemsCount++;
      this.newItem[this.itemsCount] = { quantity: 1, name: "" };
    },
    updateItem() {
      if (!this.newItem.name) {
        return;
      }
      const func = this.item ? "editItem" : "addItem";
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
  margin-top: -230px;
  width: 100%;
  direction: rtl;
}
.name-input {
  width: 100%;
}
.quan-input {
  font-size: 20px;
  max-width: 45px;
  &::v-deep {
    .q-field__inner {
      margin: 0 10px;
    }
    .q-field__before {
      padding: 0;
    }
  }
}
.add-item {
  width: 20px;
}
.add-btn {
  background-color: $primary;
  color: #fff;
}
</style>
