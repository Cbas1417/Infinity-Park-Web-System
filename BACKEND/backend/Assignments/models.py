from django.db import models
from django.contrib.auth.models import User
from Booking.models import Booking


class Assignment(models.Model):
    id = models.AutoField(primary_key=True)
    id_booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.CharField(max_length=500)
    status_assignment = models.CharField(max_length=500)
    

    def __str__(self):
        return str(self.id)
    
    class Meta:
        db_table='assignment'
        verbose_name='Assigntment'
        verbose_name_plural='Assigntments'