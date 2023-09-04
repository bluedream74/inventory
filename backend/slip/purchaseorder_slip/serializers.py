from rest_framework import serializers
from .models import Purchaseorder, PurchaseorderItem
class PurchaseorderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Purchaseorder
        fields = (
            'id',
            'no',
            'slip_date',
            'delivery_date',
            'cost_category',
            'factory_code',
            'storehouse_code',
            'charger_code',
            'status',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = PurchaseorderItem.objects.filter(purchaseorder=obj).order_by('-id')
        return PurchaseorderItemSerializer(items, many=True).data

class PurchaseorderItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()
    max_cost = serializers.SerializerMethodField()
    min_cost = serializers.SerializerMethodField()
    max_price = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()
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
            'min_price'
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
        return int(obj.product.max_cost) * obj.quantity
    
    def get_min_price(self, obj):
        return obj.product.min_cost * obj.quantity