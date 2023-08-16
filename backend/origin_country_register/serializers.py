from rest_framework import serializers
from .models import Origincountry


class OrigincountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Origincountry
        fields = '__all__'