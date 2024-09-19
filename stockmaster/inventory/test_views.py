import pytest
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from inventory.models import Product
from inventory.serializers import ProductSerializer

@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', password='testpassword')

@pytest.fixture
def product(user):
    return Product.objects.create(
        name='Test Product',
        description='Test Description',
        price=10.00,
        sku='TESTSKU',
        user=user
    )

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_get_products(api_client, user, product):
    api_client.force_authenticate(user=user)
    response = api_client.get('/inventory/api/products/')
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['name'] == product.name

@pytest.mark.django_db
def test_post_product(api_client, user):
    api_client.force_authenticate(user=user)
    data = {
        'name': 'New Product',
        'description': 'New Description',
        'price': 20.00,
        'sku': 'NEWSKU'
    }
    response = api_client.post('/inventory/api/products/', data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert Product.objects.count() == 2
    assert Product.objects.get(name='New Product')

@pytest.mark.django_db
def test_get_product_detail(api_client, user, product):
    api_client.force_authenticate(user=user)
    response = api_client.get(f'/inventory/api/products/edit/{product.id}/')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['name'] == product.name

@pytest.mark.django_db
def test_put_product(api_client, user, product):
    api_client.force_authenticate(user=user)
    data = {
        'name': 'Updated Product',
        'description': 'Updated Description',
        'price': 30.00,
        'sku': 'UPDATEDSKU'
    }
    response = api_client.put(f'/inventory/api/products/edit/{product.id}/', data, format='json')
    assert response.status_code == status.HTTP_200_OK
    product.refresh_from_db()
    assert product.name == 'Updated Product'

@pytest.mark.django_db
def test_patch_product(api_client, user, product):
    api_client.force_authenticate(user=user)
    data = {
        'price': 15.00
    }
    response = api_client.patch(f'/inventory/api/products/edit/{product.id}/', data, format='json')
    assert response.status_code == status.HTTP_200_OK
    product.refresh_from_db()
    assert product.price == 15.00
