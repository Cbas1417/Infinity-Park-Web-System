from django.db import models
from django.contrib.auth.models import User

class Role(models.Model):
    id_role = models.AutoField(primary_key=True)
    name_role = models.CharField(max_length=200)
    description_role = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name_role
    
    class Meta:
        db_table='role'
        verbose_name='Rol'
        verbose_name_plural='Roles'
