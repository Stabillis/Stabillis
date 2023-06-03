'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const closeModalEdit = () => document.getElementById('modalEdit')
    .classList.remove('active')

document.getElementById('addMaq')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('modalEditClose')
    .addEventListener('click', closeModalEdit)