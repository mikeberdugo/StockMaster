from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sku = models.CharField(max_length=100)  # Stock Keeping Unit
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True)  # Categoría del producto
    brand = models.ForeignKey('Brand', on_delete=models.SET_NULL, null=True, blank=True)  # Marca del producto
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Peso del producto
    dimensions = models.CharField(max_length=255, blank=True, null=True)  # Dimensiones del producto
    stock_alert_level = models.PositiveIntegerField(default=10)  # Nivel mínimo de stock para alertas
    is_active = models.BooleanField(default=True)  # Estado de activación del producto
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Usuario asociado al producto

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Product"
        verbose_name_plural = "Products"

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Brand"
        verbose_name_plural = "Brands"



class Warehouse(models.Model):
    name = models.CharField(max_length=255, unique=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Warehouse"
        verbose_name_plural = "Warehouses"

class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories')
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='inventories')
    quantity = models.PositiveIntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('product', 'warehouse')
        ordering = ['product', 'warehouse']
        verbose_name = "Inventory"
        verbose_name_plural = "Inventories"

    def __str__(self):
        return f"{self.product.name} in {self.warehouse.name}"


class Sale(models.Model):
    SALE_STATUSES = [
        ('P', 'Pending'),
        ('C', 'Completed'),
        ('A', 'Cancelled'),
    ]

    date = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=1, choices=SALE_STATUSES, default='P')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Sale {self.id} - {self.date.strftime('%Y-%m-%d %H:%M:%S')}"

    class Meta:
        ordering = ['-date']
        verbose_name = "Sale"
        verbose_name_plural = "Sales"








