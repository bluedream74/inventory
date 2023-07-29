from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import OrderSlip
from .serializers import OrderSerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404


class OrderSlipView(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    serializer_class = OrderSerializer
    queryset = OrderSlip.objects.all()

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        instance = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    def update(self, request, pk=None):
        instance = get_object_or_404(self.queryset, pk)
        serializer = self.serializer_class(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        instance = get_object_or_404(self.queryset, pk=pk)
        instance.delete()
        return Response({"result": "success"}, status=status.HTTP_200_OK)
