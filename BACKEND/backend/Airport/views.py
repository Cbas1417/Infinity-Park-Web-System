from django.http import JsonResponse, Http404
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny  # TODO: Change to IsAuthenticated after implementing JWT
from .models import Airport
from .serializers import AirportSerializer

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
        airports = Airport.objects.order_by('-id')

        # here we have the searching by name, IATA code, country or city
        search = request.query_params.get('search', None)
        if search:
            airports = airports.filter(
                Q(name_airport__icontains=search) |
                Q(IATA_code__icontains=search) |
                Q(country__icontains=search) |
                Q(city__icontains=search)
            )

        # pagination
        paginated = paginate_queryset(request, airports)
        serializer = AirportSerializer(
            paginated["results"], many=True, context={'request': request}
        )
        return api_response(
            data=serializer.data,
            message="Airports retrieved successfully",
            http_status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = AirportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Airport created successfully",
                http_status=status.HTTP_201_CREATED,
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )


class GetPutDel(APIView):
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated

    def get_airport(self, pk):
        try:
            return Airport.objects.get(id=pk)
        except Airport.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        airport = self.get_airport(pk)
        serializer = AirportSerializer(airport, context={'request': request})
        return api_response(
            data=serializer.data,
            message="Airport retrieved successfully",
        )

    def put(self, request, pk):
        airport = self.get_airport(pk)
        serializer = AirportSerializer(airport, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Airport updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, pk):
        airport = self.get_airport(pk)
        serializer = AirportSerializer(airport, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Airport partially updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):
        airport = self.get_airport(pk)
        airport.delete()
        return api_response(
            message="Airport deleted successfully",
        )
