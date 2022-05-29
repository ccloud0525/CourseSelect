from django.db import models


# Create your models here.
class User(models.Model):
    uid = models.CharField(max_length=8, primary_key=True)
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=64)
    identity = models.CharField(max_length=10)


class List(models.Model):
    id = models.AutoField(primary_key=True)
    cid = models.CharField(max_length=20)
    uid = models.CharField(max_length=8)
    username = models.CharField(max_length=20,default='')
    xq = models.CharField(max_length=20)
    taid = models.CharField(max_length=20)
    score = models.IntegerField(default=0)
    cname = models.CharField(max_length=20)

class CourseTemplate(models.Model):
    cid = models.CharField(max_length=20,primary_key=True)
    cname = models.CharField(max_length=40)
    xf = models.CharField(max_length=4)
    xq = models.CharField(max_length=20)

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    cid = models.CharField(max_length=20)
    cname = models.CharField(max_length=40)
    xf = models.CharField(max_length=4)
    address = models.CharField(max_length=20)
    time = models.CharField(max_length=40)
    desc = models.CharField(max_length=200)
    teacher = models.CharField(max_length=20)
    taid = models.CharField(max_length=20)
    xq = models.CharField(max_length=20)
    volumn = models.IntegerField(default=0)
    num=models.IntegerField(default=45)

class Score(models.Model):
    id = models.AutoField(primary_key=True)
    cid = models.CharField(max_length=20)
    cname = models.CharField(max_length=40)
    uid = models.CharField(max_length=8)
    repeat = models.BooleanField(default=False)
    username = models.CharField(max_length=20, default='')
    score = models.IntegerField()
    xf = models.CharField(max_length=4)
    grade = models.FloatField()

class sScore(models.Model):
    id = models.AutoField(primary_key=True)
    cid = models.CharField(max_length=20)
    cname = models.CharField(max_length=40)
    uid = models.CharField(max_length=8)
    username = models.CharField(max_length=20, default='')
    score = models.IntegerField()
    taid = models.CharField(max_length=20)
    xf = models.CharField(max_length=4)
    grade = models.FloatField()
    xq = models.CharField(max_length=20)

class sGPA(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.CharField(max_length=8)
    username = models.CharField(max_length=20, default='')
    txf =models.CharField(max_length=8,default='')
    gpa = models.FloatField()
    xq = models.CharField(max_length=20)

class GPA(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.CharField(max_length=8)
    username = models.CharField(max_length=20, default='')
    txf=models.CharField(max_length=8,default='')
    gpa = models.FloatField()
