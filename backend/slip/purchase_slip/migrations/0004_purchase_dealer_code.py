# Generated by Django 4.2.3 on 2023-08-28 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purchase_slip', '0003_rename_order_purchase_other'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='dealer_code',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
