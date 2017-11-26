import mongoose from 'mongoose'

const ArticleModel = mongoose.model('Article')

class Article {
  static async create() {
	console.log('ss')
  }

  static async getList() {

  }

  static async getDetail() {

  }

  static async put() {

  }
}

module.exports = Article