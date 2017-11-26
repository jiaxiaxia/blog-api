import mongoose from 'mongoose'

const Draft = require('../models/draft')
const Tag = require('../models/tag')

class DraftController {
  static async create(ctx) {
    let draft = new Draft(ctx.request.body)
    await draft.save((error, draft) => {
      if (error) {
        ctx.error({
          data: null,
          msg: "创建失败",
          status: 400,
          error: error
        })
        return
      }
      ctx.success({
        data: draft,
        msg: "创建成功"
      })
    })

  }


  static async patch(ctx) {
    const body = ctx.request.body
    const id = ctx.params.postId
    if (ctx.request.body.content && body.content.split('******').length > 0) {
      body.excerpt = body.content.split('******')[0]
      body.content = body.content.split('******')[1]
    }
    body.lastEditTime = new Date()
    body.draftPublished = false
    await Draft.where({ _id: id }).update({ $set: body }).populate('tags').exec(function(error) {
      if (error) {
        ctx.error({
          data: null,
          msg: "更新失败",
          status: 400,
          error: error
        })
        return
      }
      ctx.success({
        data: null,
        msg: "更新成功",
        status: 200
      })
    })
  }

  static async get(ctx) {
    let id = ctx.params.postId
    let query = Draft.findOne({ _id: id }).populate('tags')
    await query.exec((error, draft) => {
      console.log(draft)
      if (draft) {
        ctx.success({
          data: draft,
          msg: "成功"
        })
      } else {
        ctx.error({
          data: null,
          msg: "失败",
          status: 500,
          error: null
        })
      }
    })


  }

  static async getList(ctx) {
    let list = await Draft.find()
      .populate('tag')
      .sort({ lastEditTime: -1 })
      .exec((error, list) => {
        console.log('list', list)

        if (error) {
          ctx.error({
            data: null,
            msg: "获取失败",
            status: 500,
            error: error
          })
        }

        ctx.success({
          data: list,
          msg: '获取成功'
        })

      })

  }

  static async delete(ctx) {
    let id = ctx.params.postId
    await Draft.findByIdAndRemove(id)
      .then(draft => {
        if (!draft) {
          ctx.error({
            data: null,
            msg: "删除失败",
            status: 500,
            error: '该草稿不存在'
          })
          return
        }
        ctx.success({
          data: { id: id },
          msg: '删除成功',
          status: 200,
        })

      })
      .catch(error => {
        ctx.error({
          data: null,
          msg: "删除失败",
          status: 500,
          error: error
        })
      })
  }

  static async publish(ctx) {
    let id = ctx.params.postId

    await Draft.where({ _id: id })
      .update({ $set: { draftPublished: true } })
      .exec()
      .then(draft => {
        if (!draft) {
          ctx.error({
            data: null,
            msg: "发布失败",
            status: 500,
            error: '该草稿不存在'
          })
          return
        }
        ctx.success({
          data: { id: id },
          msg: '发布成功',
          status: 200,
        })

      })
      .catch(error => {
        ctx.error({
          data: null,
          msg: "发布失败",
          status: 500,
          error: error
        })
      })

  }

}

module.exports = DraftController
