from django.urls import path

from moto.views import MotoGenericAPIView


urlpatterns = [
    path('',MotoGenericAPIView.as_view()),
    path('<int:pk>/',MotoGenericAPIView.as_view()),
]
