from django.conf import settings
from django.db import models

from Utilisateurs.models import Utilisateur
from moto.models import Moto


class Contrat(models.Model):
    ETAT_CONTRAT = (
        ('en_cours','En cours'),
        ('termine','Terminé'),
        ('annule','Annulé')
    )
    
    chauffeur = models.ForeignKey(Utilisateur, on_delete = models.CASCADE)
    moto = models.ForeignKey(Moto, on_delete = models.CASCADE)
    type_contrat = models.CharField(max_length = 10, choices = [('credit','Crédit'),('embauche','Embauche')])
    montant_initial = models.DecimalField(max_digits = 10, decimal_places = 2, blank = True, null = True)
    montant_journalier = models.DecimalField(max_digits = 10, decimal_places = 2)
    date_debut = models.DateField()
    date_fin = models.DateField(blank=True, null=True)
    etat = models.CharField(max_length = 10, choices = ETAT_CONTRAT, default = 'en_cours')
    created_at = models.DateField(auto_now_add = True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'contrat_created_by', on_delete = models.SET_NULL, null = True)
    modified_at = models.DateField(auto_now = True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'contrat_modified_by', on_delete = models.SET_NULL, null = True)

    def __str__(self) -> str:
        return f"Contrat {self.type_contrat} - {self.chauffeur.first_name} {self.chauffeur.last_name}"