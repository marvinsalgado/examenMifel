import { createStore } from 'vuex';
import axios from '../axios.js';

const store = createStore({
    state: {
        users: [],
        sortField: null,
        sortOrder: 1,
        globalFilter: ''
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setSortField(state, sortField) {
            state.sortField = sortField;
        },
        setSortOrder(state, sortOrder) {
            state.sortOrder = sortOrder;
        },
        setGlobalFilter(state, globalFilter) {
            state.globalFilter = globalFilter;
        },
        DELETE_USER(state, userId) {
            // Eliminar el usuario del array basado en el ID
            state.users = state.users.filter(user => user.id !== userId);
        },
    },
    actions: {
        fetchUsers({ commit }) {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then(response => {
                    commit('setUsers', response.data);
                });
        },
        deleteUser({ commit }, userId) {
            commit('DELETE_USER', userId);
        },
    }
});

export default store;
