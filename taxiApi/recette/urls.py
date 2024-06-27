from django.urls import path

from recette.views import RecetteGenericAPIView


urlpatterns = [
    path('',RecetteGenericAPIView.as_view()),
     path('<int:pk>/',RecetteGenericAPIView.as_view())
]
