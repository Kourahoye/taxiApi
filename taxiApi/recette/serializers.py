from rest_framework import serializers
from .models import  Recette


class RecetteSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    modified_by_name = serializers.SerializerMethodField()
    chauffeur_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Recette
        fields = '__all__'

    def get_created_by_name(self,obj):
        return obj.created_by.username
    def get_modified_by_name(self,obj):
        return obj.modified_by.username
    def get_chauffeur_username(self,obj):
        return obj.chauffeur.username
