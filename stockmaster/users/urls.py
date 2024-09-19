from django.urls import path
from .views.accesses import RegisterView, LogoutView ,HomeView



urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('home/', HomeView.as_view(), name ='home'),
]



