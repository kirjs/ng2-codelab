# Codelab中文版说明
这是Kirill的Angular2教学项目的中文版本，英文原版的链接在这里 https://github.com/kirjs/ng2-codelab ，我会实时同步Kirill的commit。

# Codelab
这是一个codelab(编码实验室)平台，设计它目的是简化创建互动式习题的过程。

本应用基于Angular v2，目的是用于Angular v2的教学。

Demo:
https://ng2ts-c64e3.firebaseapp.com/

## 长期规划
* 增加更多内容
* 增加更多特性
* 成为一个通用app

## 启动server
这是一个临时的hack方法，用来同步加载习题。

在开发用的server上运行`npm start`。然后导航到`http://localhost:4200/`。这样一来，只要你对源代码做了任何修改，app就会自动刷新。

## 运行单元测试
运行`ng test`命令可以启动[Karma](https://karma-runner.github.io) 来执行单元测试用例。

## Angular-cli
此工程是通过[angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1 生成的。

关于`angular-cli`，如果你需要更多帮助，请运行`ng --help`命令，或者检出[Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md)。