# Generated by Django 4.2.3 on 2023-08-24 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchase_slip', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='order',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
