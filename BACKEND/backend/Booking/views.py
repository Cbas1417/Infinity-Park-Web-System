from datetime import datetime
from django.http import JsonResponse, Http404
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny  # TODO: Change to IsAuthenticated after implementing JWT
from .models import Booking
from .serializers import BookingSerializer

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
        bookings = Booking.objects.select_related('id_airport', 'id_user', 'id_vehicle').order_by('-id_booking')

        # Búsqueda por vuelo asociado, estado, aeropuerto, usuario o vehículo
        search = request.query_params.get('search', None)
        if search:
            bookings = bookings.filter(
                Q(associated_flight__icontains=search) |
                Q(status_booking__icontains=search) |
                Q(id_airport__name_airport__icontains=search) |
                Q(id_user__name_user__icontains=search) |
                Q(id_vehicle__plate_number__icontains=search)
            )

        # Filtrar por estado
        status_booking = request.query_params.get('status', None)
        if status_booking:
            bookings = bookings.filter(status_booking=status_booking)

        # Filtrar por fechas de checkin / checkout
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)

        if start_date:
            try:
                start_date_obj = datetime.strptime(start_date, '%Y-%m-%d')
                bookings = bookings.filter(datetime_checkin__date__gte=start_date_obj.date())
            except ValueError:
                pass

        if end_date:
            try:
                end_date_obj = datetime.strptime(end_date, '%Y-%m-%d')
                bookings = bookings.filter(datetime_checkout__date__lte=end_date_obj.date())
            except ValueError:
                pass

        # Paginación
        paginated = paginate_queryset(request, bookings)
        serializer = BookingSerializer(
            paginated["results"], many=True, context={'request': request}
        )
        return api_response(
            data=serializer.data,
            message="Bookings retrieved successfully",
            http_status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Booking created successfully",
                http_status=status.HTTP_201_CREATED,
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )


class GetPutDel(APIView):
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated

    def get_booking(self, pk):
        try:
            return Booking.objects.get(id_booking=pk)
        except Booking.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        booking = self.get_booking(pk)
        serializer = BookingSerializer(booking, context={'request': request})
        return api_response(
            data=serializer.data,
            message="Booking retrieved successfully",
        )

    def put(self, request, pk):
        booking = self.get_booking(pk)
        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Booking updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, pk):
        booking = self.get_booking(pk)
        serializer = BookingSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Booking partially updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):
        booking = self.get_booking(pk)
        booking.delete()
        return api_response(
            message="Booking deleted successfully",
        )
