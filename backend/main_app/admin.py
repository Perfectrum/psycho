from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import (
    Inbox, 
    Horizon,
    Goal,
    Task,
)


@admin.register(Inbox)
class InboxAdmin(ModelAdmin):
    list_display = ("id", "title", "user", "description")
    search_fields = ("user__username", "user__first_name", "title")


@admin.register(Horizon)
class HorizonAdmin(ModelAdmin):
    list_display = ("id", "title", "user", "description")
    search_fields = ("user__username", "user__first_name", "title")


@admin.register(Goal)
class GoalAdmin(ModelAdmin):
    list_display = ("id", "title", "user", "description")
    search_fields = ("user__username", "user__first_name", "title")


@admin.register(Task)
class TaskAdmin(ModelAdmin):
    list_display = ("id", "title", "user", "is_done", "deadline", "importance", "urgency",)
    search_fields = ("user__username", "user__first_name", "title")
    search_filter = ("is_done",)
