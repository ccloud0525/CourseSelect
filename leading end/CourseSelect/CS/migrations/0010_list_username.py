# Generated by Django 3.2.5 on 2022-02-22 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CS', '0009_course_tid'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='username',
            field=models.CharField(default='未命名', max_length=20),
        ),
    ]
