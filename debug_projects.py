import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Project
from api.serializers import ProjectSerializer
from rest_framework.renderers import JSONRenderer

try:
    projects = Project.objects.all()
    print(f"Found {projects.count()} projects.")
    for p in projects:
        print(f"Serializing project: {p.title}")
        serializer = ProjectSerializer(p)
        print(JSONRenderer().render(serializer.data))
except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()
