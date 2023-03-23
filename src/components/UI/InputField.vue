<template>
  <div v-if="type === 'date'" class="datepicker">
    <datepicker
      id="datepicker"
      :locale="sk"
      inputFormat="dd.MM.yyyy"
      :lowerLimit="new Date()"
      v-model="content"
    />
    <label for="datepicker">{{ label }}</label>
  </div>
  <v-textarea
    v-else-if="type === 'area'"
    variant="solo"
    :label="label"
    auto-grow
    v-model="content"
  ></v-textarea>
  <v-text-field v-else variant="solo" :label="label" v-model="content">
  </v-text-field>
</template>

<script setup>
import Datepicker from "vue3-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { sk } from "date-fns/locale";
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Date],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const content = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    content.value = newValue;
  }
);

watch(content, () => {
  emit("update:modelValue", content.value);
});
</script>

<style scoped lang="scss">
:deep(.v-field) {
  background-color: #777777;
  color: #ffffff;
}

.datepicker {
  background-color: #777777;
  border-radius: 4px;
  position: relative;

  label {
    top: 0.45rem;
    left: 1rem;
    font-size: 0.75rem;
    color: #d5d5d5;
    position: absolute;
    transition: 0.15s;
  }

  &:focus-within label,
  input:focus + div label {
    color: #ffffff;
  }
}

.v3dp__datepicker {
  :deep() {
    .v3dp__popout {
      padding-top: 0;
      border-radius: 4px;
      position: fixed !important;
      background-color: #777777;
      color: #ffffff;

      button:disabled {
        color: #333333;
        svg {
          stroke: #333333 !important;
        }
      }

      .v3dp__heading {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;

        button:hover {
          background-color: #555555;
        }
      }

      .v3dp__elements {
        button:hover span,
        button.selected span {
          background-color: #fcae1e;
          color: #333333;
        }
      }
    }

    input {
      padding: 1.625rem 1rem 0.4rem;
      color: #ffffff;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
