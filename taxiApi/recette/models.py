from django.conf import settings
from django.db import models

from Utilisateurs.models import Utilisateur
# Create your models here.


class Recette(models.Model):
    chauffeur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    date = models.DateField()
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='recette_created_by',
                                   on_delete=models.SET_NULL, null=True)
    modified_at = models.DateField(auto_now=True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='recette_modified_by',
                                    on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return f"Recette {self.date} - {self.chauffeur.utilisateur.firstname} {self.chauffeur.utilisateur.last_name}"
