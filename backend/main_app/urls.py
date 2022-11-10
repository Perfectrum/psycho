from django.urls import path
from .views import InboxCreateAPIView, InboxDeleteAPIView, InboxListAPIView, GoalCreateAPIView, GoalDeleteApiView, TaskCreateAPIView, InboxPatchAPIView


urlpatterns = [
    path("inbox/create/", InboxCreateAPIView.as_view(), name="inbox_create"),
    path("inbox/delete/<int:pk>/", InboxDeleteAPIView.as_view(), name="inbox_delete"),
    path("inbox/patch/<int:pk>/", InboxPatchAPIView.as_view(), name="inbox_patch"),
    path("inbox/list/", InboxListAPIView.as_view(), name="inbox_list_all"),
    path("goals/create_goal/", GoalCreateAPIView.as_view(), name="create_goal"),
    path("goals/delete/<int:pk>/", GoalDeleteApiView.as_view(), name="delete_goal"),
    path("task/create/", TaskCreateAPIView.as_view(), name="create_task")
]
