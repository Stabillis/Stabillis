'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

document.getElementById('addColab')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

const closeModalEdit = () => document.getElementById('modalEdit')
    .classList.remove('active')

document.getElementById('modalEditClose')
    .addEventListener('click', closeModalEdit)