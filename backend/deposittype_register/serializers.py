from rest_framework import serializers
from .models import Deposittype

class DeposittypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposittype
        fields = '__all__'