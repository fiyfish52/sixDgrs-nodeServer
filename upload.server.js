// 服务器配置信息
const server = {
    host: '39.96.36.32', // 服务器ip
    port: '22', // 端口一般默认22
    username: 'root', // 用户名
    password: 'zhangLIpeng021?', // 密码
    pathname: '/usr1/project/nodeServer', // 慎重！！！上传到服务器的位置,确保可以强制删除的安全目录，后面是rm -rf
    localpath:'./src/' // 本地打包文件的位置
}

// 引入scp2
const client = require('scp2');
const ora = require('ora');
const spinner = ora('正在发布到服务器...'+server.pathname);

const Client = require('ssh2').Client; // 创建shell脚本
const conn = new Client();

console.log('正在建立连接');
conn.on('ready', function () {
    console.log('已连接')
    if(!server.pathname){
        console.log('连接已关闭');
        conn.end()
        return false;
    }
    // 这里我拼接了放置服务器资源目录的位置 ，首选通过rm -rf删除了这个目录下的文件
    conn.exec('rm -rf /usr1/project/nodeServer/*', function (err, stream) {
        console.log('删除文件');
        stream.on('close', function (code, signal) {
            console.log('开始上传')
            spinner.start();
            client.scp(server.localpath, {
                "host": server.host,
                "port": server.port,
                "username": server.username,
                "password": server.password, 
                "path": server.pathname
            }, err => {
                spinner.stop();
                if (!err) {
                    console.log('项目发布完毕');
                } else {
                    console.log("err", err)
                }
                conn.end() // 结束命令
            })
        })
    })
}).connect({
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password
    //privateKey: '' //使用 私钥密钥登录 目前测试服务器不需要用到
});