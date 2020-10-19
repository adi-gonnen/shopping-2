<template>
  <div class="edit-list-container">
    <q-btn color="primary" class="lists-btn" icon="delete" @click.stop="openDeleteModal"/>

    <q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm q-mb-lg">האם את/ה בטוח/ה שברצונך למחוק?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="מחק" color="primary" class="q-mx-sm" @click="onDeleteList"/>
          <q-btn label="ביטול" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteList",
  props: ["id"],
  data: () => ({
    modal: false
  }),
  computed: {},
  methods: {
    ...mapActions({
      deleteList: "list/deleteList",
    }),
     openDeleteModal() {
      if (!this.id) {
        return
      }
      this.modal = true;
    },

    async onDeleteList() {
      await this.deleteList(this.id);
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
.edit-list-container {
  width: 45%;
  & .lists-btn {
    width: 100%;
    background-color: $primary;
    color: #fff;
    height: 50px;
  }
}
</style>
