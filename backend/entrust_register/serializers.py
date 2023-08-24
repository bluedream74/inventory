from rest_framework import serializers
from .models import Entrust


class EntrustSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrust
        fields = '__all__'