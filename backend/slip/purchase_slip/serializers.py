from rest_framework import serializers
from .models import Purchase, PurchaseItem
from slip.purchaseorder_slip.models import PurchaseorderItem
from slip.purchaseorder_slip.serializers import PurchaseorderItemSerializer
class PurchaseSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Purchase
        fields = (
            'id',
            'no',
            'slip_date',
            'delivery_date',
            'crash_credit',
            'cost_category',
            'factory_code',
            'storehouse_code',
            'charger_code',
            'purchaseorder',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = PurchaseorderItem.objects.filter(purchaseorder=obj.purchaseorder).order_by('id')
        return PurchaseItemSerializer(items, many=True).data

class PurchaseItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()
    max_cost = serializers.SerializerMethodField()
    min_cost = serializers.SerializerMethodField()
    max_price = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    quantity = serializers.SerializerMethodField()
    class Meta:
        model = PurchaseorderItem
        fields = (
            'id',
            'product',
            'product_name',
            'size',
            'color',
            'quantity',
            'unit',
            'max_cost',
            'min_cost',
            'max_price',
            'min_price',
            'status'
        )
    def get_id(self, obj):
        return obj.row_id
    
    def get_product_name(self, obj):
        return obj.product.name
    
    def get_max_cost(self, obj):
        return int(obj.product.max_cost) 
    
    def get_min_cost(self, obj):
        return obj.product.min_cost
    
    def get_max_price(self, obj):
        quantity = obj.quantity
        if(PurchaseItem.objects.filter(purchaseorderItem=obj.pk)):
            quantity = PurchaseItem.objects.get(purchaseorderItem=obj.pk).quantity
        return int(obj.product.max_cost) * quantity
    
    def get_min_price(self, obj):
        quantity = obj.quantity
        if(PurchaseItem.objects.filter(purchaseorderItem=obj.pk)):
            quantity = PurchaseItem.objects.get(purchaseorderItem=obj.pk).quantity
        return obj.product.min_cost * quantity  
    
    def get_status(self, obj):
        status = 'edit'
        if(PurchaseItem.objects.filter(purchaseorderItem=obj.pk)):
            status = 'save'
        return status
    def get_quantity(self, obj):
        quantity = obj.quantity
        if(PurchaseItem.objects.filter(purchaseorderItem=obj.pk)):
            quantity = PurchaseItem.objects.get(purchaseorderItem=obj.pk).quantity
        return quantity
