const express = require('express')
const router = express.Router()

const { getUsers, getUser, updateUser, deleteUser, restoreUser } = require('../controllers/user')
const { getPosts, getPost, addPost, updatePost, deletePost } = require('../controllers/post')
const { getProjects, getProject, addProject, updateProject, deleteProject } = require('../controllers/project')
const { register, login } = require('../controllers/auth');
// const { getTransactions } = require('../controllers/transaction');

// ---------------- USERS --------------------- //
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.post('/user/:id', restoreUser)


// ---------------- AUTH --------------------- //
router.post('/auth/register', register);
// router.post('/auth/login', login);


// ---------------- ARTS --------------------- //


// --------------- POSTS ------------------- //
router.get('/posts', getPosts)
router.get('/post/:id', getPost)
router.post('/post/:id', addPost)
router.patch('/post/:id', updatePost)
router.delete('/post/:id', deletePost)


// --------------- PROJECT ------------------- //
router.get('/projects', getProjects)
router.get('/project/:id', getProject)
router.post('/project', addProject)
router.patch('/project/:id', updateProject)
router.delete('/project/:id', deleteProject)


// ---------------- TRANSACTIONS ---------------- //
// router.get('/transactions', getTransactions)

module.exports = router