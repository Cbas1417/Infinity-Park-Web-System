from django.contrib import admin
from .models import Role

# Register your models here.

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    # Columns visible in the list
    list_display = ('id', 'name', 'description')
    # search bar
    search_fields = ('name', 'description')
