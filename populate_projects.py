import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Project

from PIL import Image
import io
from django.core.files.base import ContentFile

def create_dummy_image(color, name):
    img = Image.new('RGB', (800, 600), color=color)
    buffer = io.BytesIO()
    img.save(buffer, format='JPEG')
    return ContentFile(buffer.getvalue(), name=name)

projects_data = [
    {
        "title": "E-Commerce Dashboard",
        "description": "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order tracking. Built with React and Django Rest Framework.",
        "tech_stack": ["React", "Django", "PostgreSQL", "Tailwind CSS"],
        "github_link": "https://github.com/example/ecommerce",
        "demo_link": "https://demo.example.com",
        "color": "#3B82F6" # Blue
    },
    {
        "title": "AI Task Manager",
        "description": "Smart task management application that uses AI to prioritize daily activities. Features drag-and-drop interface and natural language processing.",
        "tech_stack": ["Python", "FastAPI", "React", "OpenAI API"],
        "github_link": "https://github.com/example/task-ai",
        "demo_link": None,
        "color": "#10B981" # Green
    },
    {
        "title": "Social Media Analytics",
        "description": "Analytics tool for social media influencers to track engagement and growth. Includes detailed charts and automated PDF reports.",
        "tech_stack": ["Vue.js", "Django", "Chart.js"],
        "github_link": "https://github.com/example/social-analytics",
        "demo_link": "https://social.example.com",
        "color": "#8B5CF6" # Purple
    },
     {
        "title": "Portfolio Website",
        "description": "A modern, responsive portfolio website to showcase projects and skills. Features a Bento grid layout, dark mode, and dynamic content fetching.",
        "tech_stack": ["React", "Vite", "Tailwind CSS"],
        "github_link": "https://github.com/kapilshivhare91/my_portfolio",
        "demo_link": "https://kapilshivhare91.github.io",
        "color": "#6366F1" # Indigo
    }
]

for data in projects_data:
    if not Project.objects.filter(title=data['title']).exists():
        print(f"Creating project: {data['title']}")
        project = Project(
            title=data['title'],
            description=data['description'],
            tech_stack=data['tech_stack'],
            github_link=data['github_link'],
            demo_link=data['demo_link']
        )
        img_file = create_dummy_image(data['color'], f"{data['title'].lower().replace(' ', '_')}.jpg")
        project.image.save(img_file.name, img_file, save=True)
        print(f"Successfully created {data['title']}")
    else:
        print(f"Project {data['title']} already exists")
