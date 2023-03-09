<template>
  <div class="form-group" :class="{ 'has-danger': errors.length }">
    <label v-if="label" class="form-label" :required="required">{{
      label
    }}</label>
    <slot></slot>
    <div v-if="errors && errors.length" class="invalid-feedback d-block">
      <div v-for="(error, index) in errors" :key="index">
        {{ `${name} ${error}` }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import store from "../stores/global.js";

export default defineComponent({
  props: {
    label: String,
    name: String,
    required: Boolean,
  },

  setup(props) {
    const errors = computed(() => {
      const getErrors = store.getters.getErrors;

      return getErrors(props.name);
    });

    return { errors };
  },
});
</script>

<style lang="scss">
.form-group {
  margin-bottom: 20px;

  &.has-danger {
    .form-control {
      border-color: #f46a6a;
    }
  }

  .form-label[required]::after {
    content: "※";
    color: #f46a6a;
    margin-left: 5px;
  }
}
</style>
