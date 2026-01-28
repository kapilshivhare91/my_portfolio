from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project, Contact
from .serializers import ProjectSerializer, ContactSerializer

# Create your views here.
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing projects.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        tag = self.request.query_params.get('tag')
        if tag:
            queryset = queryset.filter(tech_stack__icontains=tag)
        return queryset



class ContactAPIView(APIView):
    """
    A View for creating contact messages.
    """
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

