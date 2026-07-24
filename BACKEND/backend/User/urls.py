from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('users/', GetPost.as_view(), name='user-list'),
    path('users/<int:pk>/', GetPutDel.as_view(), name='user-detail'),
]
