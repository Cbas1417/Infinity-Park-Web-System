from django.db import models
from django.contrib.auth.models import User
from Role.models import Role
from Airport.models import Airport

class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    name_user = models.CharField(max_length=200)
    phone = models.CharField(max_length=3)
    email = models.CharField(blank=True, null=True, max_length=200)
    id_role = models.ForeignKey(Role, on_delete=models.CASCADE)
    id_airport = models.ForeignKey(Airport, on_delete=models.CASCADE)

    def __str__(self):
        return self.name_user
    
    class Meta:
        db_table='user'
        verbose_name='Usuario'
        verbose_name_plural='Usuarios'