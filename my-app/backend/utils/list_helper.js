const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, item) => {
    return total + item.likes
  }, 0)

}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, item) => {
    return (max.likes > item.likes) ? max : item

  })
}

const mostBlogs = (blogs) => {
  const numberOfBlogs = blogs.map(obj => obj.author)
  const result = _(numberOfBlogs)
    .countBy()
    .entries()
    .maxBy(_.last)

  // tähän vielä returni kuntoon eg number of blogs
  return {
    'author': result[0],
    'blogs': result[1]
  }
}

const mostLikes = (blogs) => {
  const counts = blogs.reduce((prev, curr) => {
    let count = prev.get(curr.author) || 0
    prev.set(curr.author, curr.likes + count)
    return prev
  }, new Map())

  const reducedBlogs = [...counts].map(([author, likes]) => {
    return { author, likes }
  })

  const maxLikes = reducedBlogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current)

  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}