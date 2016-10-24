## Base Webpack react scss hot-load workflow
`install node nginx`

`在nginx.conf的同级目录下新建文件夹servers， 将目录下.conf 文件拷贝到nginxservers目录下，并在nginx.conf 的最后添加 include servers/*;`

`配置host文件 127.0.0.1 dev.test`

`npm i`

`npm run dev //开发运行` 

`可通过配置的host名称和端口号访问本地项目`

`npm run prod //线上运行`

``
