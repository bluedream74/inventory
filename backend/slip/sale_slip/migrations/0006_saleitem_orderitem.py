# Generated by Django 4.2.3 on 2023-09-02 15:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('order_slip', '0007_remove_orderitem_color_code_and_more'),
        ('sale_slip', '0005_remove_sale_order_no_remove_saleitem_color_code_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='saleitem',
            name='orderItem',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='order_slip.orderitem'),
        ),
    ]
