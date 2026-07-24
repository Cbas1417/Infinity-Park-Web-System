from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('role/', GetPost.as_view(), name='role-list'),
    path('role/<int:pk>/', GetPutDel.as_view(), name='role-detail'),
]