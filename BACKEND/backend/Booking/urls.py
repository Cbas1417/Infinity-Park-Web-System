from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('booking/', GetPost.as_view(), name='booking-list'),
    path('booking/<int:pk>/', GetPutDel.as_view(), name='booking-detail'),
]