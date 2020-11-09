<template>
  <div v-if="newItem[1]" class="full-width">
    <div v-for="n in itemsCount" :key="n" class="row no-wrap q-mb-lg">
      <q-input
        outlined
        v-model="newItem[n].name"
        autofocus
        placeholder="הוסף פריט"
        class="name-input"
      />
      <div class="q-mr-md">
        <q-btn flat class="arrow-btn arrow-up">&#10094;</q-btn>
        <q-btn flat class="arrow-btn arrow-down">&#10094;</q-btn>
      </div>
      <q-input outlined v-model="newItem[n].quantity" type="number" class="quan-input"></q-input>
      <q-btn flat class="add-item q-ml-sm" :icon="icon(n)" @click.stop="toggleNewItem(n)"/>
    </div>
    <q-btn flat size="xl" class="add-btn fixed-bottom q-ma-sm" @click="updateItems">עדכן</q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddItem",
  data: () => ({
    newItem: [null, { quantity: 1, name: "" }],
    itemsCount: 1
  }),
  computed: {
    icon() {
      return n => {
        return n === this.itemsCount ? "add" : "cancel";
      };
    }
  },
  methods: {
    ...mapActions({
      addItem: "list/addNewItem",
      getItems: "list/getItems"
    }),
    toggleNewItem(n) {
      if (n === this.itemsCount) {
        //add
        if (this.newItem[n].name !== "") {
          this.itemsCount++;
          this.newItem[this.itemsCount] = { quantity: 1, name: "" };
        }
      } else {
        //remove
        this.newItem.splice(n, 1);
        this.itemsCount--;
      }
    },
    async updateItems() {
      for (let i = 1; i <= this.itemsCount; i++) {
        if (this.newItem[i].name) {
          this.addItem(this.newItem[i]);
        }
      }
      this.newItem = [null, { quantity: 1, name: "" }];
      await this.getItems();
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
  width: 95%;
}
.arrow-btn {
  &:v-deep {
    .q-btn__wrapper {
      padding: 0;
    }
  }
}
.arrow-up {
  transform: rotate(180deg);
}
.arrow-down {
  transform: rotate(90deg);
}
</style>
