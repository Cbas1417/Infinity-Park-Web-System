from django.http import JsonResponse, Http404
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny  # TODO: Change to IsAuthenticated after implementing JWT
from .models import Service
from .serializers import ServiceSerializer

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
        services = Service.objects.order_by('-id_service')

        # Búsqueda por nombre o descripción del servicio
        search = request.query_params.get('search', None)
        if search:
            services = services.filter(
                Q(name_service__icontains=search) |
                Q(description_service__icontains=search)
            )

        # Paginación
        paginated = paginate_queryset(request, services)
        serializer = ServiceSerializer(
            paginated["results"], many=True, context={'request': request}
        )
        return api_response(
            data=serializer.data,
            message="Services retrieved successfully",
            http_status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Service created successfully",
                http_status=status.HTTP_201_CREATED,
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )


class GetPutDel(APIView):
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated

    def get_service(self, pk):
        try:
            return Service.objects.get(id_service=pk)
        except Service.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        service = self.get_service(pk)
        serializer = ServiceSerializer(service, context={'request': request})
        return api_response(
            data=serializer.data,
            message="Service retrieved successfully",
        )

    def put(self, request, pk):
        service = self.get_service(pk)
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Service updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, pk):
        service = self.get_service(pk)
        serializer = ServiceSerializer(service, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Service partially updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):
        service = self.get_service(pk)
        service.delete()
        return api_response(
            message="Service deleted successfully",
        )
