from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('join', TemplateView.as_view(template_name='index.html')),
    path('create', TemplateView.as_view(template_name='index.html')),
    path('room/<str:code>', TemplateView.as_view(template_name='index.html')),
    path('login', TemplateView.as_view(template_name='index.html')),
    path('signup', TemplateView.as_view(template_name='index.html'))
]
