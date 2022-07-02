const express = require('express');
const { getAsync } = require('../redis')
const router = express.Router();

router.get('/', async (_, res) => {
  const todos_count = await getAsync('todosCount') || 0
  const statistics = {
    "added_todos": todos_count
  }

  res.send(statistics)
})

module.exports = router