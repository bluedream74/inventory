# Generated by Django 4.2.3 on 2023-08-22 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entrust',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default='', max_length=50)),
                ('name', models.CharField(default='', max_length=50)),
                ('phone', models.CharField(default='', max_length=20)),
                ('address', models.CharField(default='', max_length=200)),
            ],
        ),
    ]
