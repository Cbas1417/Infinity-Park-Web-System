from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from datetime import datetime
from django.http import Http404
from .models import Assignment
from .serializers import AssignmentSerializer

class GetPost(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        assignments = Assignment.objects.all()
        serializer = AssignmentSerializer(assignments, many=True)
        return Response({"data": serializer.data})

    def post(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetPutDel(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Assignment.objects.get(pk=pk)
        except Assignment.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        assignment = self.get_object(pk)
        serializer = AssignmentSerializer(assignment)
        return Response({"data": serializer.data})

    def put(self, request, pk):
        assignment = self.get_object(pk)
        serializer = AssignmentSerializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        assignment = self.get_object(pk)
        assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
