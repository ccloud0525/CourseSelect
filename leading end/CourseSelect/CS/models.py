from django.db import models


# Create your models here.
class User(models.Model):
    uid = models.CharField(max_length=8, primary_key=True)
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=64)
    identity = models.CharField(max_length=10)


class List(models.Model):
    cid = models.CharField(max_length=20)
    uid = models.CharField(max_length=8)
    username=models.CharField(max_length=20,default="未命名")
    score = models.CharField(max_length=5)
    cname = models.CharField(max_length=20,default="数据结构")


class Course(models.Model):
    cid = models.CharField(max_length=20, primary_key=True)
    cname = models.CharField(max_length=20)
    xf = models.CharField(max_length=4)
    address = models.CharField(max_length=20)
    time = models.CharField(max_length=15)
    desc = models.CharField(max_length=50)
    teacher = models.CharField(max_length=20)
    tid=models.CharField(max_length=20,default=000)
    volumn = models.IntegerField()
