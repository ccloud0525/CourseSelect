# Generated by Django 3.2.5 on 2022-02-19 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CS', '0003_list_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='volumn',
            field=models.IntegerField(default=50),
        ),
        migrations.AlterField(
            model_name='course',
            name='xf',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='list',
            name='score',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='list',
            name='uid',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='uid',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
