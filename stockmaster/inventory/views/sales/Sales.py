from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from inventory.models  import Sale
from inventory.serializers import SaleSerializer

class SaleViewSet(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        sales = Sale.objects.filter(user=user)
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        data = request.data.copy()
        data['user'] = user.id  
        
        serializer = SaleSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SaleViewEdit(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk=None):
        sale = get_object_or_404(Sale, pk=pk, user=request.user)
        serializer = SaleSerializer(sale)
        return Response(serializer.data)

    def put(self, request, pk=None):
        sale = get_object_or_404(Sale, pk=pk, user=request.user)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = SaleSerializer(sale, data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        sale = get_object_or_404(Sale, pk=pk, user=request.user)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = SaleSerializer(sale, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
