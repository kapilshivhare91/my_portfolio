from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, default="General")
    description = models.TextField()
    long_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/') # Requires Pillow
    tech_stack = models.JSONField(default=list) # Stores ["React", "Python"]
    metrics = models.JSONField(default=list) # Stores ["99% Uptime", etc.]
    github_link = models.URLField(blank=True)
    demo_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
