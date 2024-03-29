# Generated by Django 4.2.3 on 2023-08-26 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no', models.CharField(max_length=30)),
                ('spenden_no', models.CharField(max_length=30)),
                ('slip_date', models.DateField()),
                ('expected_shipping_date', models.DateField()),
                ('arrival_date', models.DateField()),
                ('invoice_date', models.DateField()),
                ('shipping_date', models.DateField()),
                ('cash_credit', models.IntegerField(default=0)),
                ('delivery_code', models.CharField(max_length=30)),
                ('storehouse_code', models.CharField(max_length=30)),
                ('global_rate', models.FloatField(default=0)),
                ('charger_code', models.CharField(max_length=30)),
                ('maker_code', models.CharField(max_length=30)),
                ('exhibition_code', models.CharField(max_length=30)),
                ('status', models.CharField(max_length=10)),
                ('other', models.CharField(max_length=200, null=True)),
                ('update_date', models.DateField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SaleItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('row_id', models.CharField(default='', max_length=200, null=True)),
                ('product_code', models.CharField(max_length=30)),
                ('product_name', models.CharField(max_length=30)),
                ('product_part_number', models.CharField(max_length=30)),
                ('size_code', models.CharField(max_length=30)),
                ('color_code', models.CharField(max_length=30)),
                ('quantity', models.FloatField(default=0)),
                ('unit', models.CharField(max_length=10)),
                ('rate', models.FloatField(default=0)),
                ('max_cost', models.FloatField(default=0)),
                ('min_cost', models.FloatField(default=0)),
                ('cost', models.FloatField(default=0)),
                ('max_price', models.FloatField(default=0)),
                ('min_price', models.FloatField(default=0)),
                ('price', models.FloatField(default=0)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('sale', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sale_slip.sale')),
            ],
            options={
                'ordering': ['-date_created'],
            },
        ),
    ]
