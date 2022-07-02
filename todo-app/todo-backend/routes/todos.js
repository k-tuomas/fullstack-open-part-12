const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({}).catch(error => console.log(error))
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const todosCount = await getAsync('todosCount') || 0
  setAsync('todosCount', parseInt(todosCount) + 1)
  res.send(todo);
});

const singleRouter = express.Router({mergeParams: true});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await Todo
    .findById(req.todo.id)
    .catch(error => console.log(error))

  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const newTodo = {
    text: req.body.text,
    done: req.body.done,
  }

  const todo = await Todo
    .findByIdAndUpdate(req.todo.id, newTodo, {useFindAndModify: false})
    .catch(error => console.log(error))
    
  res.send(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
