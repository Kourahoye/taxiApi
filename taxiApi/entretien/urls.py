from django.urls import path

from entretien.views import EntretienGenericAPIView


urlpatterns = [
    path('',EntretienGenericAPIView.as_view()),
    path('<int:pk>/',EntretienGenericAPIView.as_view()),
]
