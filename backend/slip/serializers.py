from rest_framework import serializers
from .models import OrderSlip

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderSlip
        fields = '__all__'