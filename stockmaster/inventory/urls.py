# urls.py
from django.urls import path

from .views.Product.Product import ProductViewSet ,ProductViewEdit
from .views.sales.Sales import SaleViewSet


urlpatterns = [
    path('api/products/', ProductViewSet.as_view(), name='product-list'),
    path('api/products/edit/<int:pk>/', ProductViewEdit.as_view(), name='product-edit'),
    path('api/sales/', SaleViewSet.as_view(), name='sales-list'),
]
