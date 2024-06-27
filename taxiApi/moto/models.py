from django.conf import settings
from django.db import models

# Create your models here.
#from chauffeur.models import Chauffeur



class Moto(models.Model):
   numero_serie = models.CharField(max_length = 50, unique = True)
   couleur = models.CharField(max_length = 10)
   date_achat = models.DateField()
   #chauffeur = models.ForeignKey(Chauffeur, on_delete = models.SET_NULL, null = True, blank = True)
   created_at = models.DateField(auto_now_add = True)
   created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'moto_created_by', on_delete = models.SET_NULL, null = True)
   modified_at = models.DateField(auto_now = True)
   modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'moto_modified_by', on_delete = models.SET_NULL, null = True)

   def __str__(self) -> str:
    return self.numero_serie
    