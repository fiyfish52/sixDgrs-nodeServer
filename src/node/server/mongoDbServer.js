const express = require('express')
const app = express()

const mongodbOP = require("../../configs/mongo/mongo")

app.post('/', function (req, res) {
  console.log(req.url)
  res.send('Hello World')
})

app.post('/mongo/test/I', function (req, res) {
  mongodbOP("I", {
    collection: 'sys_menu', document: [
      { menu_id: '1', menu_name: '导航1', menu_class: 'el-icon-s-home', menu_type: '1', menu_parent_id: '0', menu_url: '', menu_group_id: '', menu_group_name: '' },
      { menu_id: '2', menu_name: '选项1', menu_class: null, menu_type: null, menu_parent_id: '1', menu_url: '/about', menu_group_id: '0', menu_group_name: '分组1' }]
  })
  res.send('Hello World')
})

app.get('/mongo/test/QUE', function (req, res) {

  mongodbOP("QUE", { collection: 'sys_menu' }, function (result) {
    let ret = {}
    ret.output = {}
    ret.output.data=result
    res.send(JSON.stringify(ret))
  })
})

app.listen(8762)
console.log("started server on localhost:8762")