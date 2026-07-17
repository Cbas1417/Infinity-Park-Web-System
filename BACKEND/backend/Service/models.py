from django.db import models

class Service(models.Model):
    id_service = models.AutoField(primary_key=True)
    name_service = models.CharField(max_length=500)
    base_price = models.FloatField(max_length=100)
    description_service = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.id_service
    
    class Meta:
        db_table='service'
        verbose_name='Service'
        verbose_name_plural='Services'