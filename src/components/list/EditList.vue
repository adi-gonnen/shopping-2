<template>
  <div :class="list && 'edit-list q-mx-sm'" class="edit-list-container full-width q-mb-lg">
    <div class="main-edit-page q-mb-xl">
      <!-- edit name -->
      <div class="border q-pa-sm q-mb-md">
        <div class="fs-20">עדכן שם רשימה:</div>
        <q-input v-model="newList" placeholder="שם הרשימה" class="full-width"/>
      </div>

      <!-- set default -->
      <div class="border q-pa-sm q-mb-md">
        <q-toggle label="סמן כברירת מחדל" v-model="setAsDefault" left-label class="default-toggle"/>
      </div>

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
      <delete-list v-if="list" :id="list.id"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DeleteList from "components/list/DeleteList.vue";

export default {
  name: "EditList",
  components: { DeleteList },
  props: ["list"],
  data: () => ({
    newList: "",
    setAsDefault: false,
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
      return this.list ? +this.defualtId === +this.list.id : false;
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
      addUser: "user/addUser",
      deleteUser: "user/deleteUser"
    }),
    setUsers() {
      const data = this.list.usersData;
      const activeUsers = this.list.users;
      if (data && activeUsers.length > 1) {
        const users = [];
        activeUsers.forEach(value => {
          const label = data[value];
          users.push({ value, label });
        });
        this.selectUsers = activeUsers;
        this.users = users;
      }
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
      const update = this.list
        ? await this.setEditList()
        : await this.setAddList();
      if (update) {
        this.$nextTick(() => this.loadLists());
        this.newList = "";
        window.history.back();
      }
    },

    async setAddList() {
      const list = { name: this.newList };
      const newList = await this.addNewList(list);
      if (this.setAsDefault) {
        await this.setDefault({ id: newList, value: true });
      }
      await this.addUsers(newList);
      return true;
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
      return true;
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
      if (users && users.length !== selectUsers.length) {
        const userToDelete = users.filter(
          user => !selectUsers.includes(user.value)
        );
        for (let i = 0; i < userToDelete.length; i++) {
          const url = `${parentId}/${userToDelete[i].value}`;
          await this.deleteUser(url);
        }
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
    color: #fff;
    background-color: $primary;
  }
  &.edit-list {
    & .edit-btn {
      width: 45%;
    }
  }
  &:not(.edit-list) {
    & .edit-btn {
      margin: auto;
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
