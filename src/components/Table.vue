<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="globalFilter" placeholder="Buscar" />
      </span>
    </form>
    <DataTable :value="filteredUsers" tableStyle="min-width: 50rem" :sortField.sync="sortField" :sortOrder.sync="sortOrder" @sort="onSort">
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
      <Column field="website" header="WebSite" sortable></Column>
      <Column field="action" header="Action">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" @click="editUser(data)"></Button>
          <Button icon="pi pi-trash" @click="deleteUser(data)" class="delete-button"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import "primeicons/primeicons.css";
import axios from "../axios.js";
import {ref, onMounted, computed} from "vue";

const users = ref([]);
const sortField = ref(null);
const sortOrder = ref(1);
const globalFilter = ref('');

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = response.data;
    // console.log('users:', users.value);
  } catch (error) {
    console.error('Error al obtener userios:', error);
  }
};
const handleSubmit = () => {
  console.log('Buscar:', globalFilter.value);
};

const editUser = (user) => {
  console.log('Editar usuario:', user);
};

const deleteUser = (user) => {
  console.log('Eliminar usuario:', user);
};

const onSort = (event) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
};

const onFilter = (event) => {
  globalFilter.value = event.target.value;
};

const filteredUsers = computed(() => {
  const filterText = globalFilter.value.toLowerCase();
  return users.value.filter(user =>
          user.id.toString().includes(filterText) ||
          user.name.toLowerCase().includes(filterText) ||
          user.email.toLowerCase().includes(filterText)||
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


