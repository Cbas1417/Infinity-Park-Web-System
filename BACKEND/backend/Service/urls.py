from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('services/', GetPost.as_view(), name='service-list'),
    path('services/<int:pk>/', GetPutDel.as_view(), name='service-detail'),
]