# Generated by Django 4.2.3 on 2023-08-29 09:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product_inventory', '0004_productinventory_rate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productinventory',
            old_name='purcase_quantity',
            new_name='purchase_quantity',
        ),
        migrations.RenameField(
            model_name='productinventory',
            old_name='purcaseitem',
            new_name='purchaseitem',
        ),
    ]
