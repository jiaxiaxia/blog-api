import mongoose from 'mongoose'

const Tag = require('../models/tag')

class TagController {
  static async create(ctx) {
    console.log(ctx.request.body)
    const tag = new Tag(ctx.request.body)

    if (undefined === tag.name || 0 === tag.name.length) {
      ctx.error({
        data: null,
        msg: "标签名不能为空",
        status: 500,
        error: null
      })
    } else {
      await tag.save((error, tag) => {
        if (error) {
          ctx.error({
            data: null,
            msg: "标签创建失败",
            status: 500,
            error: error
          })
          return
        }
        ctx.success({
          data: { id: tag.id },
          msg: "标签创建成功",
          status: 200,
        })
      })

    }
    console.log('create tag')
  }

  static async getList(ctx) {
    await Tag.find()
      .then((tag) => {
        ctx.success({
          data: tag,
          msg: "获取标签列表成功",
          status: 200
        })

      })
      .catch((error) => {
        ctx.error({
          data: null,
          msg: "获取标签列表失败",
          status: 500,
          error: error

        })

      })
  }
}

module.exports = TagController
