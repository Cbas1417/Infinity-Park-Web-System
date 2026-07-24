from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id_user', 'email', 'name_user', 'phone', 'id_role', 'id_airport')
    search_fields = ('email', 'name_user', 'phone')
    list_filter = ('id_role', 'id_airport')