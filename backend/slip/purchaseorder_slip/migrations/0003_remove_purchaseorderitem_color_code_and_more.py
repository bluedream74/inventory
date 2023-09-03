# Generated by Django 4.2.3 on 2023-08-31 16:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('size_register', '0001_initial'),
        ('color_register', '0002_rename_color_code_color_code_and_more'),
        ('product_register', '0005_rename_max_price_product_max_cost_and_more'),
        ('purchaseorder_slip', '0002_purchaseorder_other'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='color_code',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='max_cost',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='max_price',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='min_cost',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='min_price',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='product_code',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='product_name',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='product_part_number',
        ),
        migrations.RemoveField(
            model_name='purchaseorderitem',
            name='size_code',
        ),
        migrations.AddField(
            model_name='purchaseorderitem',
            name='color',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='color_register.color'),
        ),
        migrations.AddField(
            model_name='purchaseorderitem',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='product_register.product'),
        ),
        migrations.AddField(
            model_name='purchaseorderitem',
            name='size',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='size_register.size'),
        ),
    ]