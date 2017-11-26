const supertest = require('supertest')
const chai = require('chai')
const request = supertest(require('../server'))

const draft = require('../controllers/Draft')


// 测试套件/组
describe('开始测试demo的GET请求', () => {

  // 测试用例
  it('测试/draft请求', (done) => {
    request
      .get('/drafts')
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an('object')
        expect(res.body.success).to.be.an('boolean')
        expect(res.body.data).to.be.an('string')
        done()
      })
  })
})
