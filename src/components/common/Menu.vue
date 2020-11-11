<template>
  <div>
    <q-img v-if="auth" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div v-if="profile" class="bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="profile.picture">
        </q-avatar>
        <div class="text-weight-bold">{{profile.auth.name}}</div>
        <div>{{profile.email}}</div>
      </div>
    </q-img>
    <q-list padding>
      <q-item clickable v-ripple class="q-mb-md" @click="openMenu('lists')">
        <q-item-section avatar>
          <q-icon name="shopping_cart"></q-icon>
        </q-item-section>
        <q-item-section class="fs-20 text-weight-bold q-mb-sm">ערוך רשימות</q-item-section>
      </q-item>

      <q-item v-ripple class="q-mb-md">
        <q-item-section avatar>
          <q-icon name="local_activity"></q-icon>
        </q-item-section>
        <q-item-section class="fs-20 text-weight-bold q-mb-sm">ערוך קטגוריות</q-item-section>
      </q-item>

      <q-item clickable v-ripple class="q-mb-md" @click="confirm = true">
        <q-item-section avatar>
          <q-icon name="cancel"></q-icon>
        </q-item-section>
        <q-item-section class="fs-20 text-weight-bold q-mb-sm">יציאה</q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm q-mb-lg">האם את/ה בטוח/ה שברצונך להתנתק?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="ניתוק" color="primary" class="q-mx-sm" @click="onLogout"/>
          <q-btn label="ביטול" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Menu",
  data: () => ({
    confirm: false
  }),
   computed: {
    ...mapState({
      profile: state => state.user.profile,
      auth: state => state.user.auth
    })
  },
  methods: {
    ...mapActions({
      logout: "user/logout"
    }),
    async onLogout() {
      this.confirm = false;
      await this.logout();
      this.$emit('closeMenu');
    },
    openMenu(type) {
      this.confirm = false;
      this.$nextTick(() => this.$router.push(`/${type}`));
    }
  }
};
</script>

<style>
</style>
