import pytest
from rest_framework.exceptions import ValidationError
from inventory.models import Product
from inventory.serializers import ProductSerializer

@pytest.mark.django_db
def test_product_serializer_valid():
    # Crear una instancia de Product
    product = Product.objects.create(
        name='Test Product',
        description='Test Description',
        price=10.00,
        sku='TESTSKU',
        user_id=1  # Asegúrate de que el ID de usuario es válido
    )
    serializer = ProductSerializer(product)
    assert serializer.data['name'] == 'Test Product'
    assert serializer.data['price'] == '10.00'

@pytest.mark.django_db
def test_product_serializer_create():
    data = {
        'name': 'New Product',
        'description': 'New Description',
        'price': 20.00,
        'sku': 'NEWSKU',
        'user': 1  # Asegúrate de que el ID de usuario es válido
    }
    serializer = ProductSerializer(data=data)
    assert serializer.is_valid()
    product = serializer.save()
    assert product.name == 'New Product'
    assert Product.objects.count() == 1
    assert Product.objects.get(name='New Product')

@pytest.mark.django_db
def test_product_serializer_invalid():
    data = {
        'name': '',
        'price': 'invalid'
    }
    serializer = ProductSerializer(data=data)
    assert not serializer.is_valid()
    assert 'name' in serializer.errors
    assert 'price' in serializer.errors
