from rest_framework import serializers
from .models import  Utilisateur
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class UtilisateurSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    modified_by_name = serializers.SerializerMethodField()
    class Meta:
        model = Utilisateur
        fields = ['id','username','first_name','last_name','password','type_utlisateur','telephone','addresse','email','date_embauche','created_by_name','modified_by_name','created_at','modified_at','created_by','modified_by']

    def get_created_by_name(self,obj):
        try:
            return obj.created_by.username
        except:
            return ""
    def get_modified_by_name(self,obj):
        try:
            return obj.modified_by.username
        except:
            return ""



class TokenSerialiser(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        self.username = attrs.get("username")
        self.password = attrs.get("password")
        
        if self.username and self.password:
            user = authenticate(username=self.username,password=self.password)
            if user:
                refresh = RefreshToken.for_user(user)
                return {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': user                    
                }
            else:
                raise serializers.ValidationError("Nom d'utiliateur ou mot de passe incorrecte")
        else:
            raise serializers.ValidationError("Donnez le username et le password")    
        
