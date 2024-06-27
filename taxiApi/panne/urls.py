from django.urls import path

from panne.views import PanneGenericAPIView


urlpatterns = [
    path('',PanneGenericAPIView.as_view()),
    path('<int:pk>/',PanneGenericAPIView.as_view()),
   
]
