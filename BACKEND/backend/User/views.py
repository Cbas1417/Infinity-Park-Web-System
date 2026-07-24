from django.utils import datastructures
from django.http import request
from django.http import JsonResponse, Http404
from django.db import transaction
from django.db.models import Q
from django.contrib.auth.models import User as AuthUser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny  # TODO: Change to IsAuthenticated after implementing JWT
from .models import User
from .serializers import UserSerializer

# Standardized JSON response
def api_response(data=None, message=None, errors=None, http_status=200):
    body = {"status": "success" if http_status < 400 else "error"}
    if message:
        body["message"] = message
    if data is not None:
        body["data"] = data
    if errors:
        body["errors"] = errors
    return JsonResponse(body, safe=False, status=http_status)

# Manual pagination for APIView
def paginate_queryset(request, queryset, page_size=20):
    page = int(request.query_params.get('page', 1))
    total = queryset.count()
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "results": queryset[start:end],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_items": total,
            "total_pages": (total + page_size - 1) // page_size,
        }
    }


class GetPost(APIView):
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated

    def get(self, request):
        users = User.objects.order_by('-id_user')

        # Searching by name, email or phone
        search = request.query_params.get('search', None)
        if search:
            users = users.filter(
                Q(name_user__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search)
            )

        # Pagination
        paginated = paginate_queryset(request, users)
        serializer = UserSerializer(
            paginated["results"], many=True, context={'request': request}
        )
        return api_response(
            data=serializer.data,
            message="Users retrieved successfully",
            http_status=status.HTTP_200_OK,
        )

    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return api_response(
                errors={"email/password": "Ambos campos son requeridos para crear el usuario"},
                message="Validation failed",
                http_status=status.HTTP_400_BAD_REQUEST,
            )

            # 1. Validaciones básicas de entrada
        if not email or not password:
            return api_response(
                errors={"email/password": "Ambos campos son requeridos para crear el usuario"},
                message="Validation failed",
                http_status=status.HTTP_400_BAD_REQUEST,
            )

        # 2. Dejar que el serializer valide y guarde todo de forma atómica
        serializer = UserSerializer(data=data)
    
        if not serializer.is_valid():
            return api_response(
                errors=serializer.errors,
                message="Validation failed",
                http_status=status.HTTP_400_BAD_REQUEST,
            )

        # save() ejecutará el create() del UserSerializer (que crea AuthUser y User)
        user_instance = serializer.save()

        return api_response(
            data=UserSerializer(user_instance, context={'request': request}).data,
            message="User created successfully",
            http_status=status.HTTP_201_CREATED,
        )


class GetPutDel(APIView):
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated

    def get_user(self, pk):
        try:
            return User.objects.get(id_user=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_user(pk)
        serializer = UserSerializer(user, context={'request': request})
        return api_response(
            data=serializer.data,
            message="User retrieved successfully",
        )

    def _sync_auth_user(self, auth_user, data, partial=False):
        email = data.get('email', None)
        name = data.get('name_user', None)
        password = data.get('password', None)

        if email is not None:
            auth_user.email = email
            auth_user.username = email
        elif not partial:
            # en PUT (no parcial) si no mandan email, no lo tocamos igual,
            # solo actualizamos si viene explícito
            pass

        if name is not None:
            auth_user.first_name = name

        if password:
            auth_user.set_password(password)

        auth_user.save()

    def put(self, request, pk):
        user = self.get_user(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                self._sync_auth_user(user.id_user, request.data, partial=False)
                serializer.save()
            return api_response(
                data=serializer.data,
                message="User updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, pk):
        user = self.get_user(pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                self._sync_auth_user(user.id_user, request.data, partial=True)
                serializer.save()
            return api_response(
                data=serializer.data,
                message="User partially updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):
        user = self.get_user(pk)
        with transaction.atomic():
            auth_user = user.id_user  # keep references before delete
            user.delete()
            auth_user.delete()  # by on_delete=CASCADE it deletes itself, but we make it explicit
        return api_response(
            message="User deleted successfully",
        )