from rest_framework import serializers
from .models import Product, Category, Brand ,Sale

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'sku', 'weight', 'dimensions', 'stock_alert_level', 'is_active', 'created_at', 'updated_at', 'user']
        read_only_fields = ['user'] 
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Evita cambiar el usuario una vez creado
        validated_data.pop('user', None)
        return super().update(instance, validated_data)


class SaleSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    
    class Meta:
        model = Sale
        fields = ['id', 'date', 'total', 'user', 'status', 'product', 'quantity', 'unit_price', 'updated_at']
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('user', None)
        return super().update(instance, validated_data)
    



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

