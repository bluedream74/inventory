# Generated by Django 4.2.3 on 2023-08-28 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sale_slip', '0003_sale_dealer_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='order_no',
            field=models.CharField(max_length=20, null=True),
        ),
    ]