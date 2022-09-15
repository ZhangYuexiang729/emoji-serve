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
      Emojipic.getCount = (cb) => {

        Emojipic.find({
          where: {
            parentId: 0
          }
        }, (err, res) => {
          cb(err, res.length)
        })
    
      }
      Emojipic.getData = (skip,limit,cb) => {
        let allData = []
        Emojipic.find({
          where: {
            parentId: 0
          },
          // fetch 1st "page" with 5 entries in it
            skip:skip,
            limit:limit
          
        
        }).then(res=>{
          
          var time
          
          for(let i=0;i<res.length;i++){
            
            Emojipic.find({
              where:{
                parentId:res[i].id
              }
            }).then(resOne=>{
              res[i].list = resOne
              allData.push(res[i])
              clearTimeout(time)
              time = setTimeout(() => {
              
                  cb(null,allData);
                }, 100)

            })
          }
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
        description: "获取图片详情"
      })
      Emojipic.remoteMethod("getCount", {
     
        returns: {
          arg: "data",
          type: 'object',
          root: true
        },
        http: {
          verb: 'get'
        },
        description: "获取图片数量"
      })
      Emojipic.remoteMethod("getData", {
        accepts: [{
          arg: 'skip',
          type: 'number',
          required: true,
        },
        {
          arg: 'limit',
          type: 'number',
          required: true,
        },
      ],
        returns: {
          arg: "data",
          type: 'object',
          root: true
        },
        http: {
          verb: 'get'
        },
        description: "获取图片数据"
      })
};
