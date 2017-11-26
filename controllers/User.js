class User {


  // 用户登录
  static async login(ctx) {
	let name = ctx.request.body.name || '';
	let password = ctx.request.body.password || '';
	console.log(`signin with name: ${name}, password: ${password}`);
	if (name && password) {
	  ctx.response.body = {
		data: '登录成功'
	  };
	  ctx.success({ data: '登录成功' })
	} else {
	  ctx.error({
		data: '登录失败',
		msg: 'error msg',
		status: 400,
		error: { "msg": 'ssss' }
	  })
	}
  }

  // 用户退出
  static async logout(ctx) {
	// await ……
  }

  // 更新用户资料
  static async put(ctx) {
	// await ……
  }

  // 删除用户
  static async deleteUser(ctx) {
	// await ……
  }

  // 重置密码
  static async resetpwd(ctx) {
	// await ……
  }
}

module.exports = User;