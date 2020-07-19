import app from '@/App.vue'
import NotesList from '@/components/NotesList'
import NoteItem from '@/components/NoteItem'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'


describe('Notes_counter', () => {
    // Now mount the component and you have the wrapper
    const wrapperParent = mount(app)
    const wrapperChild = mount(NotesList)

    console.log("New Note Button test after rendering a new note.....")

    it('has a button', () => {
      expect(wrapperChild.contains('.new-note')).toBe(true)
    })

    console.log("Index property of note  item Testing..... ")

    it('index count increment',() => {
      expect(wrapperParent.vm.index).toBe(0)
      wrapperParent.find(NotesList).vm.$emit('new-note')
      wrapperParent.find(NotesList).vm.$emit('new-note') 
      expect(wrapperParent.vm.index).toBe(1)
      wrapperParent.vm.index = 0
      wrapperParent.vm.notes = []  
    })

    console.log("Create New note testing..... ")

    it('Number of notes increment on new_note click',() => {
        expect(wrapperParent.vm.notes.length).toBe(0)
        wrapperParent.find(NotesList).vm.$emit('new-note')
        expect(wrapperParent.vm.notes.length).toBe(1) 
        wrapperParent.vm.index = 0
        wrapperParent.vm.notes = []  
    })

    console.log("Deleting a note testing..... ")

    it('Number of notes decrement on delete_note click',() => {
        expect(wrapperParent.vm.notes.length).toBe(0)
        wrapperParent.find(NotesList).vm.$emit('new-note')
        expect(wrapperParent.vm.notes.length).toBe(1) 
        wrapperParent.find(NoteItem).vm.$emit('delete-note')
        expect(wrapperParent.vm.notes.length).toBe(0)   
    })


  })
