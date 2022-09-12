'use strict';

module.exports = function(Emojipic) {
    Emojipic.nextServerListData = (id, cb) => {

        Emojipic.find({
          where: {
            parentId: id
          }
        }, (err, res) => {
          cb(err, res)
        })
    
      }
      Emojipic.remoteMethod("nextServerListData", {
        accepts: [{
          arg: 'id',
          type: 'any',
          required: true,
        }],
        returns: {
          arg: "data",
          type: 'object',
          root: true
        },
        http: {
          verb: 'get'
        },
        description: "获取服务包详情"
      })
    
};
