from rest_framework import serializers
from .models import Storehouse


class StorehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storehouse
        fields = '__all__'