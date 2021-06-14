<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ul>
      <li v-for="(todo, index) in this.$store.state.todos" :key="index">
        {{ todo }} <button @click="edit(index)">Edit</button>
        <button @click="deleteElement(index)">delete</button>
      </li>
    </ul>
    <play-audio
      url="http://localhost:3000/media/fc27e65e-c73c-4757-bf00-87d3462782ab.mp3"
    ></play-audio>
  </div>
  <button @click="add">Add</button>
</template>

<script>
import PlayAudio from "../components/PlayAudio.vue";
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    deleteElement: function (index) {
      this.$store.state.todos.splice(index, 1);
    },
    add: function () {
      let newvalue = prompt("add new value");
      this.$store.state.todos.push(newvalue);
    },
    edit: function (index) {
      let response = prompt("new value");
      this.update(index, response);
    },
    update: function (index, value) {
      this.$store.state.todos[index] = value;
    },
  },
  components: { PlayAudio },
};
</script>
