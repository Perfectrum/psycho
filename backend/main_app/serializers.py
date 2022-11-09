from rest_framework import serializers
from .models import Inbox, Task


class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbox
        fields = ("title", "description")


class InboxPatchSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.save()
        return instance


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("title", "reference", "goals", "horizon", "is_done", "description", "deadline", "importance", "urgency")

