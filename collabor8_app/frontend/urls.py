from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('join', TemplateView.as_view(template_name='index.html')),
    path('join', TemplateView.as_view(template_name='index.html')),
    path('room/<int:roomId>', TemplateView.as_view(template_name='index.html'))
]
