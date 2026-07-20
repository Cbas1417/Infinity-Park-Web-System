from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('roles/', GetPost.as_view(), name='role-list'),
    path('roles/<int:pk>/', GetPutDel.as_view(), name='role-detail'),
]