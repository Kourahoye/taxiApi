from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Utilisateur(AbstractUser):
    TYPES_UTILISATEUR = (
        ('admin','Admin'),
        ('manager','Manager'),
        ('chauffeur','Chauffeur')
    )
    
    type_utlisateur = models.CharField(max_length = 10, choices = TYPES_UTILISATEUR)
    telephone = models.CharField(max_length = 15, null = True, blank = True)
    addresse = models.TextField(null = True, blank = True)
    date_embauche = models.DateField(null = True, blank = True)
    created_at = models.DateField(auto_now_add = True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'chauffeur_created_by', on_delete = models.SET_NULL, null = True)
    modified_at = models.DateField(auto_now = True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'chauffeur_modified_by', on_delete = models.SET_NULL, null = True)

    
    def __str__(self):
        return self.username
    