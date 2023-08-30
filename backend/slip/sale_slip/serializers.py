from rest_framework import serializers
from .models import Sale, SaleItem

class SaleSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Sale
        fields = (
            'id',
            'no',
            'spenden_no',
            'slip_date',
            'expected_shipping_date',
            'arrival_date',
            'invoice_date',
            'shipping_date',
            'cash_credit',
            'delivery_code',
            'storehouse_code',
            'global_rate',
            'charger_code',
            'maker_code',
            'exhibition_code',
            'dealer_code',  
            'status',
            'order_no',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = SaleItem.objects.filter(sale=obj).order_by('-id')
        return SaleItemSerializer(items, many=True).data

class SaleItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = SaleItem
        fields = (
            'id',
            'product_code',
            'product_name',
            'product_part_number',
            'size_code',
            'color_code',
            'quantity',
            'unit',
            'rate',
            'max_cost',
            'max_price',
            'min_cost',
            'min_price',
            'cost',
            'price'
        )
    def get_id(self, obj):
        return obj.row_id