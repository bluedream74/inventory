from django.db import models
from slip.order_slip.models import OrderItem
from slip.sale_slip.models import SaleItem
from slip.payment_slip.models import PaymentItem
from slip.purchaseorder_slip.models import PurchaseorderItem
from slip.purchase_slip.models import PurchaseItem
from slip.sale_slip.models import SaleItem
from product_register.models import Product
from size_register.models import Size
from color_register.models import Color
# Create your models here.
class ProductInventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, null=True)
    quantity = models.FloatField(default=0, null=True)
    unit = models.CharField(max_length=10, null=True)
    purchaseItem = models.ForeignKey(PurchaseItem, on_delete=models.CASCADE, null=True)
    in_quantity = models.FloatField(default=0, null=True)
    saleItem = models.ForeignKey(SaleItem, on_delete=models.CASCADE, null=True)
    out_quantity = models.FloatField(default=0, null=True)
    state = models.BooleanField(null=True)
    date_created = models.DateTimeField(auto_now_add=True,  null=True)
    date_updated = models.DateTimeField(auto_now=True, null=True)