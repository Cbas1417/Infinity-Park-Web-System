from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('vehicles/', GetPost.as_view(), name='vehicle-list'),
    path('vehicles/<int:pk>/', GetPutDel.as_view(), name='vehicle-detail'),
]

