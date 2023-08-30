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
    class Meta:
        model = PurchaseorderItem
        fields = (
            'id',
            'product_code',
            'product_name',
            'product_part_number',
            'size_code',
            'color_code',
            'quantity',
            'unit',
            'max_cost',
            'max_price',
            'min_cost',
            'min_price',
            
        )
    def get_id(self, obj):
        return obj.row_id