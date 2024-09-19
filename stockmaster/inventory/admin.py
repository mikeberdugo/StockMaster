from django.contrib import admin
from .models import Product , Sale

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'sku', 'category', 'brand', 'is_active', 'created_at', 'updated_at', 'user')
    search_fields = ('name', 'sku', 'category__name', 'brand__name', 'user__username')
    list_filter = ('category', 'brand', 'is_active', 'created_at', 'user')
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at')

    # Opcional: Filtrar productos para que los usuarios solo vean los que han creado
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            queryset = queryset.filter(user=request.user)
        return queryset

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'total', 'user', 'status', 'updated_at')
    list_filter = ('status', 'user', 'date')
    search_fields = ('id', 'user__username', 'total')
    ordering = ('-date',)

    def get_readonly_fields(self, request, obj=None):
        # Make 'user' field read-only
        if obj:
            return self.readonly_fields + ('user',)
        return self.readonly_fields
    
    