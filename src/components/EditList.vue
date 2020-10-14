<template>
  <div :class="list && 'edit-list'" class="edit-list-container row justify-between no-wrap">
    <q-btn flat class="edit-btn" :icon="icon" @click.stop="modal = true"/>

    <q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="newList" autofocus placeholder="הוסף רשימה"/>
          <q-checkbox label="סמן כברירת מחדל" v-model="setAsDefault" class="q-my-md"/>
          <q-btn flat size="xl" class="add-btn full-width" @click="addList">{{btnText}}</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditList",
  props: ["list"],
  data: () => ({
    newList: "",
    setAsDefault: false,
    modal: false
  }),
  computed: {
    btnText() {
      return this.list ? "עדכן רשימה" : "הוסף רשימה";
    },
    icon() {
      return this.list ? "edit" : "add";
    }
  },
  mounted() {
    if (this.list) {
      this.newList = this.list.name;
      // this.newList = JSON.parse(JSON.stringify(this.list));
    }
  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
      addNewItem: "list/addNewItem"
    }),
    addList() {
      if (!this.newList) {
        return;
      }
      const func = this.list ? "editList" : "addNewList";
      this[func](this.newList);
      this.modal = false;
      if (!this.list) {
        this.newList = "";
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
.edit-list-container:not(.edit-list) {
  width: 45%;
  & .edit-btn {
    width: 100%;
    background-color: $primary;
    color: #fff;
    height: 50px;
  }
}
</style>
