const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const {Post} = require('./models')

router.use(jsonParser)

router.get('/', (req, res) => {
  Post
    .find()
    .then(posts => {
      res.json({
        posts: posts.map(
          (post) => post.apiRepr()
        )
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({message: 'Internal server error'})
    })
})

router.get('/:id', (req, res) => {
  Post
    .findById(req.params.id)
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    })
})

router.post('/', (req, res) => {
  const requiredFields = ['title', 'content', 'author']
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i]
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  Post
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    })
    .then(
      post => res.status(201).json(post.apiRepr())
    )
    .catch(err => {
      console.error(err)
      res.status(500).json({message: 'Internal server error'})
    })
})

module.exports = router
