from rest_framework import serializers
from .models import Consignment, ConsignmentItem

class ConsignmentSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Consignment
        fields = (
            'id',
            'no',
            'slip_date',
            'entrust_code',
            'storehouse_code',
            'global_rate',
            'charger_code',
            'exhibition_code',
            'status',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = ConsignmentItem.objects.filter(consignment=obj).order_by('-id')
        return ConsignmentItemSerializer(items, many=True).data

class ConsignmentItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = ConsignmentItem
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