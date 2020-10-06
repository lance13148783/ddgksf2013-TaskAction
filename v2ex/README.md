# 说在前边
 > [Github Actions入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

 > [代码仓库](https://github.com/Wenmoux/V2ex-Auto-Sign)
<!--more-->

# 操作步骤
## Step 1 Fork仓库
打开[代码链接](https://github.com/Wenmoux/V2ex-Auto-Sign)并Fork我的仓库
![fork源代码](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/IMG_20200608_085223.jpg)
##  Step 2 设置Cookie
fork完之后,如图点击<font color="red">Settings</font>
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/IMG_20200608_085340.jpg)

进去之后依次点击<font color="red">Secrets----new secret</font>
点击之后
Name输入V2EXCK value输入你的v2ex cookie
完成后点击add secret
同理再添加一个qmagapi [获取地址](https://qmsg.zendee.cn)
Name 是QMSGAPI value是你的api
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/IMG_20200629_092046.jpg)
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/IMG_20200629_092209.jpg)
## Step 3 启用Actions
点击Action，再点击**I understand my workflows, go ahead and enable them**  
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/687474703a2f2f74752e79616f68756f2e6d652f696d67732f323032302f30362f333463613136306339373262393932372e706e67.png)
## Step 4 运行结果
点击Actions-v2ex-auto-sign-build查看
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/7c27953002262d15.png)
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/IMG_20200608_091224.jpg)
![](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/april_2020-06-29-09-17-02-621.jpg)
## 其它说明
 - 设置好之后要点击Actions启用下
 - 可以自己改定时时间
 - 还没想到

