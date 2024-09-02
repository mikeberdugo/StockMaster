# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.Product.Product import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
