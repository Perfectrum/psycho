from django.urls import path
from .views import InboxCreateAPIView, InboxDeleteAPIView


urlpatterns = [
    path("inbox/create", InboxCreateAPIView.as_view(), name="inbox_create"),
    path("inbox/delete/<int:pk>/", InboxDeleteAPIView.as_view(), name="inbox_delete"),
]
