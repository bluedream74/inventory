from rest_framework import serializers
from .models import incomingDepartment

class IncomingDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = incomingDepartment
        fields = '__all__'