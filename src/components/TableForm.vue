<template>
  <div class="card">
    <FormSearch />
    <DataTable :value="filteredUsers" :sortField.sync="sortField" :sortOrder.sync="sortOrder" @sort="onSort">
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="website" header="WebSite" sortable></Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" @click="editUser(data)"></Button>
          <Button icon="pi pi-trash" @click="deleteUser(data)" class="delete-button"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import {onMounted, computed } from 'vue';
import FormSearch from "./FormSearch.vue";
import Swal from "sweetalert2";
const store = useStore();

const sortField = computed({
  get: () => store.state.sortField,
  set: (value) => store.commit('setSortField', value)
});

const sortOrder = computed({
  get: () => store.state.sortOrder,
  set: (value) => store.commit('setSortOrder', value)
});

const fetchUsers = async () => {
  try {
    await store.dispatch('fetchUsers');
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const editUser = (user) => {
  Swal.fire({
    title: 'Editar Usuario',
    text: `¿Estás seguro de editar a ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, editar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      store.commit('setUser', user);
      Swal.fire('Usuario editado', '', 'success');
    }
  });
};

const deleteUser = (user) => {
  Swal.fire({
    title: 'Eliminar Usuario',
    text: `¿Estás seguro de eliminar a ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteUser', user.id);
      Swal.fire('Usuario eliminado', '', 'success');
    }
  });
};

const onSort = (event) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
};

const filteredUsers = computed(() => {
  const filterText = store.state.globalFilter.toLowerCase();
  return store.state.users.filter(user =>
      user.id.toString().toLowerCase().includes(filterText) ||
      user.name.toLowerCase().includes(filterText) ||
      user.email.toLowerCase().includes(filterText) ||
      user.website.toLowerCase().includes(filterText)
  );
});

onMounted(() => {
  fetchUsers();
});
</script>

<style>
.delete-button {
  background-color: red;
  color: white;
}
</style>
