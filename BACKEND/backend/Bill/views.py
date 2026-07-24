from django.http import JsonResponse, Http404
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny  # TODO: Change to IsAuthenticated after implementing JWT
from .models import Bill
from .serializers import BillSerializer

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
        bills = Bill.objects.select_related('id_booking').order_by('-id_bill')

        # Búsqueda por proveedor de servicio, estado de pago o vuelo de reserva
        search = request.query_params.get('search', None)
        if search:
            bills = bills.filter(
                Q(service_provider__icontains=search) |
                Q(pay_status__icontains=search) |
                Q(id_booking__associated_flight__icontains=search)
            )

        # pagination
        paginated = paginate_queryset(request, bills)
        serializer = BillSerializer(
            paginated["results"], many=True, context={'request': request}
        )
        return api_response(
            data=serializer.data,
            message="Bills retrieved successfully",
            http_status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Bill created successfully",
                http_status=status.HTTP_201_CREATED,
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )


class GetPutDel(APIView):
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated

    def get_bill(self, pk):
        try:
            return Bill.objects.get(id_bill=pk)
        except Bill.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        bill = self.get_bill(pk)
        serializer = BillSerializer(bill, context={'request': request})
        return api_response(
            data=serializer.data,
            message="Bill retrieved successfully",
        )

    def put(self, request, pk):
        bill = self.get_bill(pk)
        serializer = BillSerializer(bill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Bill updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, pk):
        bill = self.get_bill(pk)
        serializer = BillSerializer(bill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data=serializer.data,
                message="Bill partially updated successfully",
            )
        return api_response(
            errors=serializer.errors,
            message="Validation failed",
            http_status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, pk):
        bill = self.get_bill(pk)
        bill.delete()
        return api_response(
            message="Bill deleted successfully",
        )
