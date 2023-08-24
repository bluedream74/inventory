from rest_framework import serializers
from .models import Order, OrderItem

class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = (
            'id',
            'no',
            'slip_date',
            'delivery_date',
            'shopping_date',
            'delivery_place_code',
            'storehouse_code',
            'global_rate',
            'charger_code',
            'receiver_code',
            'exhibition_code',
            'status',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = OrderItem.objects.filter(order=obj).order_by('-id')
        return OrderItemSerializer(items, many=True).data

class OrderItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
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
            'price',
            'profit'
        )
    def get_id(self, obj):
        return obj.row_id