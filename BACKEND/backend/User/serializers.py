from rest_framework import serializers
from django.contrib.auth.models import User as AuthUser
from django.db import transaction
from .models import User

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'id_user': {'read_only': True}
        }

    def validate(self, attrs):
        # Determinamos qué username se usará para el AuthUser
        raw_username = attrs.get('username')
        email = attrs.get('email')
        name_user = attrs.get('name_user')

        final_username = raw_username or email or name_user

        # Solo validamos si estamos creando un registro nuevo
        if not self.instance:
            if final_username and AuthUser.objects.filter(username=final_username).exists():
                raise serializers.ValidationError({
                    "username": "Este nombre de usuario/correo ya se encuentra registrado."
                })

            if email and AuthUser.objects.filter(email=email).exists():
                raise serializers.ValidationError({
                    "email": "Este correo electrónico ya está registrado."
                })
        else:
            current_auth_id = self.instance.id_user_id
            if final_username and AuthUser.objects.filter(username=final_username).exclude(pk=current_auth_id).exists():
                raise serializers.ValidationError({
                    "username": "Este usuario ya está en uso por otra cuenta."
                })

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        username = validated_data.pop('username', None)
        password = validated_data.pop('password', None)

        if not username:
            username = validated_data.get('email') or validated_data.get('name_user')

        # 1. Crear usuario de autenticación de Django
        auth_user = AuthUser.objects.create_user(
            username=username,
            email=validated_data.get('email', ''),
            password=password
        )

        # 2. Crear el perfil de tu app vinculado a auth_user
        user_profile = User.objects.create(id_user=auth_user, **validated_data)
        return user_profile

    @transaction.atomic
    def update(self, instance, validated_data):
        username = validated_data.pop('username', None)
        password = validated_data.pop('password', None)

        auth_user = instance.id_user

        if username:
            auth_user.username = username
        if 'email' in validated_data:
            auth_user.email = validated_data.get('email')
        if password:
            auth_user.set_password(password)
            
        auth_user.save()

        return super().update(instance, validated_data)