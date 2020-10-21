<template>
  <div :class="list && 'edit-list q-mx-sm'" class="edit-list-container full-width q-mb-lg">
    <div class="main-edit-page q-mb-xl">
      <!-- edit name -->
      <div class="border q-pa-sm q-mb-md">
        <div class="fs-20">עדכן שם רשימה:</div>
        <q-input v-model="newList" placeholder="הוסף רשימה" class="full-width"/>
      </div>

      <!-- set default -->
      <div class="border q-pa-sm q-mb-md">
        <q-toggle label="סמן כברירת מחדל" v-model="setAsDefault" left-label class="default-toggle"/>
      </div>

      {{selectUsers}}

      <!-- add user -->
      <div class="border q-pa-sm q-mb-md">
        <div class="fs-20">הוסף משתמש חדש:</div>
        <q-input
          v-for="n in countUsers"
          :key="n"
          v-model="newUsers[n]"
          type="email"
          placeholder="אימייל"
          class="full-width"
        >
          <template v-slot:append>
            <q-avatar>
              <q-btn round dense flat @click="toggleNewUser(n)" :icon="icon(n)"/>
            </q-avatar>
          </template>
        </q-input>
      </div>

      <!-- remove users -->
      <div v-if="users" class="border q-pa-sm q-mb-md">
        <div class="fs-20 q-mb-md">הסר שותפים מהרשימה:</div>
        <q-list v-if="users" class="q-mb-sm">
          <q-item v-for="user in users" :key="user.value" tag="label" class="q-px-none">
            <q-item-section class="users-list">
              <q-item-label caption>
                <q-avatar size="32px">
                  <img :src="user.label.picture">
                </q-avatar>
              </q-item-label>
              <q-item-label
                :class="!isSelect(user.value) && 'line-through'"
                class="q-ma-xs"
              >{{user.label.name}}</q-item-label>
            </q-item-section>
            <q-item-section avatar class="q-px-none">
              <q-toggle
                v-model="selectUsers"
                :val="user.value"
                checked-icon="check"
                unchecked-icon="clear"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- operate btns -->
    <div class="btns-container row fixed-bottom">
      <q-btn flat class="edit-btn" @click="updateList">{{btnText}}</q-btn>
      <q-btn v-if="list" class="edit-btn delete-btn" @click="modal=true">מחיקה</q-btn>
    </div>

    <!-- delete modal -->
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
    newUsers: [],
    countUsers: 1
  }),
  computed: {
    ...mapState({
      defualtId: state => state.user.defaultListId
    }),
    btnText() {
      return this.list ? "עדכן רשימה" : "הוסף רשימה";
    },

    isDefault() {
      if (this.list) {
        return +this.defualtId === +this.list.id;
      } else {
        return false;
      }
    },
    isSelect() {
      return id => {
        return this.selectUsers.find(item => {
          return item === id;
        });
      };
    },
    icon() {
      return n => {
        return n === this.countUsers ? "add" : "cancel";
      };
    }
  },
  mounted() {
    if (this.list) {
      this.newList = this.list.name;
      this.$nextTick(() => this.setUsers());
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
      deleteList: "list/deleteList",
      addUser: "user/addUser",
      deleteUser: "user/deleteUser",
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
        this.users = users;
      }
    },
    async onDeleteList() {
      await this.deleteList(this.list.id);
      this.loadLists();
      this.modal = false;
      window.history.back();
    },
    toggleNewUser(n) {
      if (n === this.countUsers) {
        //add
        if (this.newUsers[n] !== "") {
          this.countUsers++;
        }
      } else {
        //remove
        this.newUsers.splice(n, 1);
        this.countUsers--;
      }
    },
    async updateList() {
      if (!this.newList) {
        return;
      }
      //delete/parentId/id (of user)
      this.list ? await this.setEditList() : await this.setAddList();
      await this.loadLists();
      this.modal = false;
      if (!this.list) {
        this.newList = "";
      }
      window.history.back();
    },

    async setAddList() {
      const list = { name: this.newList };
      const newList = await this.addNewList(list);
      if (this.setAsDefault) {
        await this.setDefault({ id: newList, value: true });
      }
      await this.addUsers(newList);      
    },

    async setEditList() {
      const list = JSON.parse(JSON.stringify(this.list));
      if (this.list.name !== this.newList) {
        list.name = this.newList;
        await this.editList(list);
      }
      if (this.isDefault !== this.setAsDefault) {
        await this.setDefault({ id: this.list.id, value: this.setAsDefault });
      }
      await this.addUsers(list.id);
      await this.removeUsers(list.id);
    },

    async addUsers(parentId) {
      const users = this.newUsers;
      if (users[1]) {
        for (let i = 1; i < users.length; i++) {
          const user = { parentId, email: users[i] };
          await this.addUser(user);
        }
      }
    },
    async removeUsers(parentId) {
      const users = this.users;
      const selectUsers = this.selectUsers;
      if (users.length !== selectUsers.length) {
        const userToDelete = users.filter(user => {
          selectUsers.find(() => !+user.value)})
        debugger
        // for (let i = 0; i < users.length; i++) {
        //   const url = `${parentId}/${users[i]}`
        //   await this.deleteUser(url);
        // }
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
.btns-container {
  background-color: #fff;
  padding: 16px;
  justify-content: space-between;
  width: 100%;
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
.q-toggle.default-toggle {
  display: flex !important;
  justify-content: space-between;
  font-size: 20px;
  margin: 8px 0 8px 16px;
}
</style>
