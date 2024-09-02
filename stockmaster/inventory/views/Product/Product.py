from rest_framework import viewsets
from inventory.models  import Product
from inventory.serializers import ProductSerializer




class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer