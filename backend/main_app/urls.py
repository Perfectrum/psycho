from django.urls import path
from .views import InboxCreateAPIView, InboxDeleteAPIView, InboxPatchAPIView


urlpatterns = [
    path("inbox/create/", InboxCreateAPIView.as_view(), name="inbox_create"),
    path("inbox/delete/<int:pk>/", InboxDeleteAPIView.as_view(), name="inbox_delete"),
    path("inbox/patch/<int:pk>/", InboxPatchAPIView.as_view(), name="inbox_patch"),
]
