from rest_framework import serializers
from .models import *
from django.contrib.auth.models import Group
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class userSerializer(serializers.ModelSerializer):
    
    permission_groups = serializers.SerializerMethodField('get_group_names')
    
    class Meta:
        model=user
        fields=('uuid', 'email', 'phone', 'name', 'is_superuser', 'permission_groups')
    
    def get_group_names(self,obj):
        group_name_list = obj.groups.values_list('name', flat=True) #assuming group has a name field
        return group_name_list


class RegistrationUserSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type': 'password'},
                                      write_only=True)
    
    class Meta:
        model = user
        fields = ('email', 'phone', 'password', 'password2', 'name', )
        extra_kwargs = {
			'password': {'write_only': True}
		}
        
    def save(self, **kwargs):
        print(kwargs)
        print(self.validated_data)
        
        userObj = user(email=self.validated_data['email'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.ValidationError({'Password': 'Passwords do not match.'})

        
        userObj.set_password(password)
        
        userObj.name = kwargs['name']
        userObj.phone = kwargs['phone']
        
        userObj.save()
        
        group = Group.objects.get(name=kwargs['destinationGroup'])
        print(group)
        userObj.groups.add(group)
        
        return userObj


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['group'] = user.groups.values_list('name', flat=True)[0]
        token['name'] = user.name
        token['email'] = user.email

        return token
