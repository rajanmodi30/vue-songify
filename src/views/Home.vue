<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ul>
      <li v-for="(todo, index) in this.$store.state.todos" :key="index">
        {{ todo }} <button @click="edit(index)">Edit</button>
        <button @click="deleteElement(index)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    deleteElement: function (index) {
      this.$store.state.todos.splice(index, 1);
    },
    edit: function (index) {
      let response = prompt("new value");
      this.update(index, response);
    },
    update: function (index, value) {
      this.$store.state.todos[index] = value;
    },
  },
  components: {},
};
</script>
