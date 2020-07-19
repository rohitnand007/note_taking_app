<template>
  <div id="app">
    <NotesList
      @change-note="changeNote"
      @new-note="newNote"
      :notes="notes"
      :activeNote="index"
    />
    <NoteItem
      @save-note="saveNote"
      @delete-note="deleteNote"
      :note="notes[index]"
    />
  <!-- {{notes.length}} -->
  </div>
</template>

<script>
import NoteItem from "./components/NoteItem";
import NotesList from "./components/NotesList";

export default {
  name: "app",
  components: {
    NotesList,
    NoteItem
  },
  data() {
    if (localStorage.getItem("index") !== null) {
      return {
        notes: JSON.parse(localStorage.getItem("notes")),
        index: parseInt(localStorage.getItem("index"))
      };
    } else {
      return {
        notes: [],
        index: 0
      };
    }
  },
  // data: () => ({
  //   notes: [],
  //   index: 0
  // }),
  methods: {
    newNote() {
      this.notes.push({
        title: "",
        content: ""
      });
      this.index = this.notes.length - 1;
    },
    changeNote(index) {
      this.index = index;
    },
    saveNote() {
      // nothing as of yet
      localStorage.setItem("notes", JSON.stringify(this.notes));
      localStorage.setItem("index", JSON.stringify(this.index));
      this.newNote();
    },
    deleteNote() {
      this.notes.splice(this.index, 1);
      localStorage.setItem("notes", JSON.stringify(this.notes));
      this.index = Math.max(this.index - 1, 0);
      localStorage.setItem("index", JSON.stringify(this.index));
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
}
</style>
