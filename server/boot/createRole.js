'use strict';
console.log("创建角色启动...")
module.exports = function(server) {
  // 创建 超级管理员
  const EmoUser = server.models.EmoUser
  const Role = server.models.Role
  const RoleMapping = server.models.RoleMapping

EmoUser.findOrCreate({
    where: {
      username: "admin"
    }
  }, {
    username: "admin",
    realName: "admin",
    password: "123456"
  }).then(admin => {
    Role.findOrCreate({
      "name": "超级管理员"
    }).then(role => {
      RoleMapping.findOrCreate({
        principalType: RoleMapping.USER,
        principalId: admin[0].id,
        roleId: role[0].id
      }).then(res => {
        console.log("创建超级管理员成功")
      })
    })
  })
  // 角色创建
  Role.findOrCreate({
    "name": "超级管理员"
  })
}