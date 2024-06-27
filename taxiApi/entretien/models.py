from django.conf import settings
from django.db import models

from moto.models import Moto

# Create your models here.
class Entretien(models.Model):
    moto = models.ForeignKey(Moto, on_delete= models.CASCADE)
    type_entretien = models.CharField(max_length=50)
    date_entretien = models.DateField()
    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='entretien_created_by',
                                   on_delete=models.SET_NULL, null=True)
    modified_at = models.DateField(auto_now=True)
    modified_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='entretien_modified_by',
                                    on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'Entretien {self.moto.numero_serie} - {self.date_entretien}'