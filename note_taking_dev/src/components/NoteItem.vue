<template>
  <div class="note">
    <div v-if="note">
      <label for="title">Title</label>
      <input
        type="text"
        v-model="note.title"
        class="title"
        name="title"
        placeholder="Enter a title"
      />
      <label for="content">Content</label>
      <textarea
        class="content"
        name="content"
        v-model="note.content"
        placeholder="Enter Note's Content here"
      ></textarea>
      <button @click="saveNote()">Save Note</button>
      <button @click="clearNote()"> Clear Content </button>
      <button id="delNote" ref="delNote" @click="waitNote()">Delete Note</button>
    </div>
    <div v-else>
      <h1>&larr; To start, create a new note!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteItem",
  props: ["note"],
  data (){
      return{
          timer : 5,
          click : null 
      }
  },
  methods: { 
    waitNote(){
        if (this.$refs.delNote.innerHTML === 'Delete Note'){
            this.$refs.delNote.innerHTML = 'Undo Delete in ' + this.timer + ' sec';
            this.click = setTimeout(function(){
            this.deleteNote(); 
            this.$refs.delNote.innerHTML = 'Delete Note';
            }.bind(this),5000);
        }
        else{
            clearTimeout(this.click);
            this.$refs.delNote.innerHTML = 'Delete Note';
        }
        
    },  
    deleteNote() {
      this.$emit("delete-note");
    },
    saveNote() {
      this.$emit("save-note");
    },
    clearNote() {
        this.note.content = '';
    }
  }
};
</script>

<style scoped>
.note {
  width: 100%;
  padding: 2rem;
  box-shadow: 3rem 0 5rem 3rem #c1f5ff;
}

.content,
.title {
  border-style: none;
  border-radius: 0.25rem;
  border: solid 1px lightgray;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.25rem;
}

.content:focus,
.title:focus {
  outline: 0;
}

.content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  resize: vertical;
  font-size: 1.5rem;
  padding: 0.5rem;
  height: 20rem;
}

.title {
  font-size: 2rem;
  padding: 0.5rem 1rem;
}

label {
  margin-bottom: 0.5rem;
  display: inline-block;
}

button {
  border-style: none;
  padding: 0.5rem 0.75rem;
  background-color: #44abc3;
  margin-right: 1rem;
  border-radius: 0.25rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #368ea2;
}
</style>
