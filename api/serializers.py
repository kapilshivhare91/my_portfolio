from rest_framework import serializers
from .models import Project, Contact

class ProjectSerializer(serializers.ModelSerializer):
    techStack = serializers.JSONField(source='tech_stack')
    longDescription = serializers.CharField(source='long_description')
    githubUrl = serializers.URLField(source='github_link')
    liveUrl = serializers.URLField(source='demo_link')

    class Meta:
        model = Project
        fields = ['id', 'title', 'category', 'description', 'longDescription', 
                 'image', 'techStack', 'metrics', 'githubUrl', 'liveUrl']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
