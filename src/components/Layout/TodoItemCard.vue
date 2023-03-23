<template>
  <v-card :class="itemProp.state === 'done' ? 'completed' : ''">
    <v-row>
      <v-col cols="12" sm="10">
        <v-card-title>{{ itemProp.title }}</v-card-title>
        <hr />
        <v-card-text class="text-justify">
          {{ itemProp.description }}
        </v-card-text>
      </v-col>
      <v-col
        cols="12"
        sm="2"
        class="d-flex justify-center align-center flex-column"
      >
        <div class="d-flex flex-column">
          <inner-button
            variant="accept"
            @click="toggleCompleted(itemProp.id)"
          />
          <inner-button variant="delete" @click="deleteTodoItem(itemProp.id)" />
        </div>
        <div class="mt-2">
          <v-icon color="#FCAE1E" icon="mdi-clock-alert-outline" />
          <v-card-text style="color: #fcae1e" class="pa-0">
            {{ itemProp.deadline }}
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { defineProps, reactive } from "vue";
import useTodoListStore from "../../store/useTodoListStore";

import InnerButton from "../UI/InnerButton.vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  listId: {
    type: [String, Number],
    required: true,
  },
});

const store = useTodoListStore();
const itemProp = reactive(props.item);

const deleteTodoItem = (id) => {
  store.deleteTodoItem(props.listId, id);
};

const toggleCompleted = (id) => {
  store.toggleCompleted(props.listId, id);
};
</script>

<style scoped lang="scss">
.v-card {
  color: #ffffff;
  box-shadow: rgba(243, 168, 30, 0.658) 0px 3px 6px,
    rgba(248, 173, 34, 0.486) 0px 3px 6px;
  background-color: #555555;

  .v-card-title {
    text-align: left;
    font-size: 2rem;
  }

  .v-card-text {
    font-size: 1.15rem;
  }

  &.completed {
    opacity: 0.25;
  }

  button {
    min-width: 2.5rem;
    width: 2.5rem;
    color: #fcae1e;
    background-color: #555555;
    border: 1px solid #fcae1e;

    &:hover {
      box-shadow: rgba(243, 168, 30, 0.658) 0px 3px 6px,
        rgba(248, 173, 34, 0.486) 0px 3px 6px;
    }
    &.toggle-complete {
      color: rgb(23, 187, 23);
    }

    &.delete {
      color: #f8345b;
    }
  }
}
</style>
