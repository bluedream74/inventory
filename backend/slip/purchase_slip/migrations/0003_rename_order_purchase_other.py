# Generated by Django 4.2.3 on 2023-08-24 11:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('purchase_slip', '0002_purchase_order'),
    ]

    operations = [
        migrations.RenameField(
            model_name='purchase',
            old_name='order',
            new_name='other',
        ),
    ]