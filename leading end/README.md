## 环境搭建

- 前端采用微信开发者工具。从微信官方下载即可，不得不吐槽一句tx确实是Windows公司，不仅旗下软件从不适配Linux，连开发工具也不做个Linux版

- 后端使用Django框架，我用conda创建了一个虚拟环境完成环境配置

  ```shell
  conda env create -n py39dj python==3.9
  conda activate py39dj
  
  conda install django
  ```

- 数据库采用MySQL, SQL server虽然更加好用，但是MySQL赢在了高度适配，目前所有后端框架都完美适配MySQL.

  

  



## 前端和后端交互

主要形式基于微信小程序分装的wx.request机制。几乎将这个过程做到了傻瓜式处理。

在Django中urls.py中将前端函数的请求访问链接和views.py中的处理函数关联起来，即可完成前后端的交互，处理函数在处理完数据，操作好数据库后可以通过return JsonResponse等操作和前端通信。

ps：需提前注册app:

```shell
python manage.py startapp CS
```



## 后端和数据库交互

采用Django框架的数据库处理工具，进行ORM映射。

值得一提的是，数据库依旧需要提前建好，然后在setting.py中配置DATABASE项，实现和数据库的连接

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'courseselect',
        'HOST': '127.0.0.1',
        'USER': 'root',
        'PASSWORD': '********',
        'PORT': 3306

    }
}
```

在models.py中建表

进入虚拟环境后在终端执行

```shell
python manage.py makemigrations CS
python manage.py migrate CS
```

即可完成映射，在预先建立好的数据库中完成建表



关于数据库的增删改查，也几乎做到了新手级别，只要会用filter就行，Django的ORM会自动帮你将之转化为SQL语句进行查表