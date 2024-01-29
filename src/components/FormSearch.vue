<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="globalFilter" placeholder="Buscar" />
      </span>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import InputText from 'primevue/inputtext';
import { computed } from 'vue';


const store = useStore();

const globalFilter = computed({
  get: () => store.state.globalFilter,
  set: (value) => store.commit('setGlobalFilter', value)
});

const handleSubmit = () => {
};
</script>
