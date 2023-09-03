# Generated by Django 4.2.3 on 2023-09-03 09:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sale_slip', '0006_saleitem_orderitem'),
        ('deposit_slip', '0002_deposit_sale_no'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deposit',
            name='sale_no',
        ),
        migrations.RemoveField(
            model_name='deposititem',
            name='deposit_category',
        ),
        migrations.AddField(
            model_name='deposit',
            name='sale',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sale_slip.sale'),
        ),
        migrations.AddField(
            model_name='deposititem',
            name='saleItem',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sale_slip.saleitem'),
        ),
    ]