<template>
  <div :class="list && 'edit-list q-mx-sm'" class="edit-list-container full-width">
    <q-input outlined v-model="newList" autofocus placeholder="הוסף רשימה" class="full-width"/>
    <q-checkbox label="סמן כברירת מחדל" v-model="setAsDefault" class="fs-20 q-my-md"/>
    <div v-if="users" class="fs-20 bold">עדכן שותפים לרשימה:</div>
    <q-list v-if="users" class="q-mb-sm">
      <q-item v-for="user in users" :key="user.value" tag="label" v-ripple class="q-px-none">
        <q-item-section avatar class="q-px-none">
          <q-checkbox v-model="selectUsers" :val="user.value"/>
        </q-item-section>
        <q-item-section class="users-list">
          <q-item-label caption>
            <q-avatar size="32px" >
              <img :src="user.label.picture">
            </q-avatar>
          </q-item-label>
          <q-item-label class="q-ma-xs">{{user.label.name}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="fs-20 bold">הוסף משתמש חדש:</div>
    <q-input outlined v-model="newUser" placeholder="אימייל" class="full-width"/>

    <div class="btns-container row justify-around fixed-bottom full-width q-my-sm q-mx-md">
      <q-btn flat class="edit-btn" @click="addList">{{btnText}}</q-btn>
      <q-btn v-if="list" class="edit-btn delete-btn" @click="modal=true">מחיקה</q-btn>
    </div>

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
import { mapState, mapActions } from "vuex";
export default {
  name: "EditList",
  props: ["list"],
  data: () => ({
    newList: "",
    setAsDefault: false,
    modal: false,
    users: null,
    selectUsers: [],
    newUser: ''
  }),
  computed: {
    ...mapState({
      defualtId: state => state.user.defaultListId
    }),
    btnText() {
      return this.list ? "עדכן רשימה" : "הוסף רשימה";
    },
    icon() {
      return this.list ? "edit" : "add";
    },
    isDefault() {
      if (this.list) {
        return +this.defualtId === +this.list.id;
      } else {
        return false;
      }
    }
  },
  mounted() {
    if (this.list) {
      this.newList = this.list.name;
      this.$nextTick(() =>this.setUsers())      
      if (this.isDefault) {
        this.setAsDefault = true;
      }
    }
  },
  methods: {
    ...mapActions({
      editList: "list/editList",
      addNewList: "list/addList",
      setDefault: "user/setDefault",
      loadLists: "user/loadLists",
      deleteList: "list/deleteList"
    }),
    setUsers() {
      const data = this.list.usersData;
      if (data) {
        const keys = Object.keys(data);
        this.selectUsers = keys;
        const values = Object.values(data);
        const users = [];
        keys.forEach((key, idx) => {
          users.push({ value: key, label: values[idx] });
        });
        console.log("userdata", users);
        this.users = users;
      }
    },
    async onDeleteList() {
      await this.deleteList(this.list.id);
      this.modal = false;
      window.history.back();
    },
    async addList() {
      if (!this.newList) {
        return;
      }
      if (this.list) {
        const list = JSON.parse(JSON.stringify(this.list));
        list.name = this.newList;
        await this.editList(list);
      } else {
        const list = { name: this.newList };
        await this.addNewList(list);
      }
      if (this.isDefault !== this.setAsDefault) {
        this.setDefault({ id: this.list.id, value: this.setAsDefault });
      }
      this.loadLists();
      this.modal = false;
      if (!this.list) {
        this.newList = "";
      }
      window.history.back();
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
.edit-list-container {
  & .edit-btn {
    height: 50px;
    font-size: 20px;
    width: 95%;
    &:not(.delete-btn) {
      color: #fff;
      background-color: $primary;
    }
  }
  &.edit-list {
    & .edit-btn {
      width: 45%;
    }
  }
}
.users-list {
  flex-direction: row !important;
  justify-content: flex-start;
    align-items: center;
}

</style>
