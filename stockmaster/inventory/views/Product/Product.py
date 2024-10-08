
from inventory.models  import Product
from inventory.serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404

class ProductViewSet(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        products = Product.objects.filter(user=user)  
        serializer = ProductSerializer(products, many=True) 
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        data = request.data.copy()
        data['user'] = user.id  # Asignando el usuario a los datos

        # Imprime los datos recibidos antes de la validación
        print("Datos recibidos en POST:", data)
        serializer = ProductSerializer(data=data, context={'request': request})
        print(serializer.is_valid()) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Imprime los errores de validación del serializador
            print("Errores del serializador:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ProductViewEdit(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk=None):
        product = get_object_or_404(Product, pk=pk, user=request.user)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk=None):
        product = get_object_or_404(Product, pk=pk, user=request.user)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ProductSerializer(product, data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        product = get_object_or_404(Product, pk=pk, user=request.user)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ProductSerializer(product, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        