from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import OrderSlip
from .serializers import OrderSerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.db.models import Count

class OrderSlipView(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    serializer_class = OrderSerializer
    queryset = OrderSlip.objects.all()

    def list(self, request):
        return Response(OrderSlip.objects.values("no").aggregate({"count": Count("no")}))

    def create(self, request):
        common_data = request.data['common']
        content_data = request.data['content']
        for index, content_row in enumerate(content_data):
            row_data = {
                'no': common_data['No'],
                'slip_date': datetime.fromisoformat(common_data['slipDate']).strftime("%Y-%m-%d"),
                'delivery_date':  datetime.fromisoformat(common_data['deliveryDate']).strftime("%Y-%m-%d"),
                'shopping_date':  datetime.fromisoformat(common_data['shoppingDate']).strftime("%Y-%m-%d"),
                'delivery_place_code': common_data['deliveryPlaceCode'],
                'storehouse_code': common_data['storehouseCode'],
                'global_rate': common_data['globalRate'],
                'charger_code': common_data['chargerCode'],
                'receiver_code': common_data['receiverCode'],
                'exhibition_code': common_data['exhibitionCode'],
                'status': common_data['status'],
                'product_code': content_row['productCode'],
                'product_name': content_row['productName'],
                'product_part_number': content_row['ProductPartnumber'],
                'size_code': content_row['size'],
                'color_code': content_row['color'],
                'quantity': content_row['quantity'],
                'unit': content_row['unit'],
                'rate': content_row['maxCost'],
                'max_cost': content_row['rate'],
                'max_price': content_row['maxPrice'],
                'min_cost': content_row['minCost'],
                'min_price': content_row['cost'],
                'cost': content_row['minPrice'],
                'price': content_row['price'],
                'profit': content_row['profit'],
            }
            serializer = self.serializer_class(data=row_data)
            if serializer.is_valid():
                serializer.save()
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'result': 'success'})

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
