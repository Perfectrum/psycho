from rest_framework import serializers
from .models import Inbox, Task, Goal


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


class TaskUpdateSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    state = serializers.CharField(required=False)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.state = validated_data.get("state", instance.state)
        instance.save()
        return instance


class TaskSerializer(serializers.ModelSerializer):
    goals = serializers.SlugRelatedField(many=True, read_only=True, slug_field="title")

    class Meta:
        model = Task
        fields = ("id", "title", "reference", "state", "goals", "horizon", "description", "deadline", "importance", "urgency")


class GoalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Goal
        fields = ("title", "description")
