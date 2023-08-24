from rest_framework import serializers
from .models import Collection, CollectionItem

class CollectionSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Collection
        fields = (
            'id',
            'no',
            'slip_date',
            'shipping_date',
            'delivery_code',
            'storehouse_code',
            'global_rate',
            'charger_code',
            'exhibition_code',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = CollectionItem.objects.filter(collection=obj).order_by('-id')
        return CollectionItemSerializer(items, many=True).data

class CollectionItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = CollectionItem
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