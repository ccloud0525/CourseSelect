# Generated by Django 3.2.5 on 2022-02-19 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CS', '0004_auto_20220219_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='xf',
            field=models.CharField(max_length=4),
        ),
    ]
