from django.urls import path
from .views import GetUserView, CreateUserView

urlpatterns = [
    path('user', GetUserView.as_view()),
    path('sign-up', CreateUserView.as_view())
]
