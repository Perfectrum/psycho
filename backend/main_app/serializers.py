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
    importance = serializers.FloatField(required=False)
    urgency = serializers.FloatField(required=False)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.state = validated_data.get("state", instance.state)
        instance.importance = validated_data.get("importance", instance.importance)
        instance.urgency = validated_data.get("urgency", instance.urgency)
        instance.save()
        return instance


class TaskSerializer(serializers.ModelSerializer):
    goals = serializers.SlugRelatedField(many=True, read_only=True, slug_field="title")

    class Meta:
        model = Task
        fields = ("id", "title", "reference", "state", "goals", "horizon", "description", "deadline", "importance", "urgency")


class GoalNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ("id",)


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ("id", "title", "description")


class TaskCreateSerializer(serializers.ModelSerializer):
    goals = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=Goal.objects.all()),
        allow_empty=False,
    )

    class Meta:
        model = Task
        fields = ("title", "reference", "state", "goals", "horizon", "description", "deadline", "importance", "urgency")

    def create(self, validated_data):
        goal_ids = validated_data.pop("goals")

        new_task = Task.objects.create(**validated_data)

        if goal_ids:
            for goal_id in goal_ids:
                new_task.goals.add(goal_id)
        new_task.save()
        return new_task
