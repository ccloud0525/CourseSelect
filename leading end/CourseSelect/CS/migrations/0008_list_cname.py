# Generated by Django 3.2.5 on 2022-02-19 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CS', '0007_alter_course_volumn'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='cname',
            field=models.CharField(default='数据结构', max_length=20),
        ),
    ]