# Generated by Django 3.0.3 on 2020-02-23 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0013_auto_20200223_1009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.CharField(max_length=300),
        ),
    ]
