# Generated by Django 3.0.3 on 2020-02-23 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0012_auto_20200223_0954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='email',
            name='client_ip',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
