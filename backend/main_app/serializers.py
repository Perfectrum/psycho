from rest_framework import serializers
from .models import Inbox, Task


class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbox
        fields = ("title", "description")


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("title", "reference", "goals", "horizon", "is_done", "description", "deadline", "importance", "urgency")

