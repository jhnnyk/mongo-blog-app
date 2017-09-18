const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: Date, required: true, default: new Date()}
})

postSchema.virtual('authorName').get(function () {
  return `${this.author.firstName} ${this.author.lastName}`
})

postSchema.methods.apiRepr = function () {
  return {
    title: this.title,
    content: this.content,
    author: this.authorName,
    created: this.created
  }
}

const Post = mongoose.model('Post', postSchema)

module.exports = {Post}
