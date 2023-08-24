from rest_framework import serializers
from .models import Purchase, PurchaseItem

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
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = PurchaseItem.objects.filter(purchase=obj).order_by('-id')
        return PurchaseItemSerializer(items, many=True).data

class PurchaseItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = PurchaseItem
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
            'other'
        )
    def get_id(self, obj):
        return obj.row_id