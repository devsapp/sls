# 帮助文档

通过该组件，可以对SLS产品进行相关操作

## 参数

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| regionId  | true |  string |  cn-beijing、cn-hangzhou、cn-shanghai、cn-qingdao、cn-zhangjiakou、cn-huhehaote、cn-shenzhen、cn-chengdu、 cn-hongkong、ap-southeast-1、 ap-southeast-2、ap-southeast-3、 ap-southeast-5、ap-northeast-1、eu-central-1、eu-west-1、us-west-1、us-east-1、ap-south-1  |  地域 |   |
| logstore  | true | string  | - | 日志项目  |  -   |
| project  | true | string  | - |  日志仓库  | -  |
| description  | false | string  | - | 日志项目描述 | -  |


------- 

# 其它

组件开发者：项目编译

````
$ npm i

$ npm run build:ts && npm run package-zip
````
