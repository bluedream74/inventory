from django.db import models
from slip.order_slip.models import OrderItem
from slip.sale_slip.models import SaleItem
from slip.payment_slip.models import PaymentItem
from slip.purchaseorder_slip.models import PurchaseorderItem
from slip.purchase_slip.models import PurchaseItem
from slip.deposit_slip.models import DepositItem
# Create your models here.
class ProductInventory(models.Model):
    product_code = models.CharField(max_length=30)
    product_name = models.CharField(max_length=30)
    product_part_number = models.CharField(max_length=30)
    size_code = models.CharField(max_length=30)
    color_code = models.CharField(max_length=30)
    storehouse_code = models.CharField(max_length=30)
    unit = models.CharField(max_length=10)
    rate = models.FloatField(default=0)
    global_rate = models.FloatField(default=0)
    max_cost = models.FloatField(default=0)
    min_cost = models.FloatField(default=0)
    max_price = models.FloatField(default=0)
    min_price = models.FloatField(default=0)
    cost = models.FloatField(default=0)
    price = models.FloatField(default=0)

    factory_code = models.CharField(max_length=30, null=True)
    purchaseorder_date = models.DateField(null=True)
    purcaseorder_quantity = models.IntegerField(null=True)
    purchaseorderitem = models.ForeignKey(PurchaseorderItem, on_delete=models.CASCADE, null=True)
    purchase_date = models.DateField(null=True)
    purchase_quantity = models.IntegerField(null=True)
    purchaseitem = models.ForeignKey(PurchaseItem, on_delete=models.CASCADE, null=True)
    payment_date = models.DateField(null=True)
    payment_price = models.FloatField(null=True)
    paymentitem = models.ForeignKey(PaymentItem, on_delete=models.CASCADE, null=True)

    dealer_code = models.CharField(max_length=30, null=True)
    order_date = models.DateField(null=True)
    order_quantity = models.IntegerField(null=True)
    orderitem = models.ForeignKey(OrderItem, on_delete=models.CASCADE, null=True)
    sale_date = models.DateField(null=True)
    sale_quantity = models.IntegerField(null=True)
    saleitem = models.ForeignKey(SaleItem, on_delete=models.CASCADE, null=True)
    deposit_date = models.DateField(null=True)
    deposit_price = models.FloatField(null=True)
    deposititem = models.ForeignKey(DepositItem, on_delete=models.CASCADE, null=True)

    parent_inventory = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    update_date = models.DateField(auto_now=True, null=True)
