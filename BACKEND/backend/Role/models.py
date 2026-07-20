from django.db import models
from django.contrib.auth.models import User

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table='role'
        verbose_name='Rol'
        verbose_name_plural='Roles'
