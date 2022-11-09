from django.db import models
from django.contrib.auth.models import User


class Goal(models.Model):
    title = models.CharField("Название", max_length=255)
    user = models.ForeignKey(
        User,
        related_name="goals",
        on_delete=models.CASCADE,
        verbose_name="Пользователь"
    )
    description = models.TextField("Описание", blank=True, null=True)

    class Meta:
        verbose_name = "Цель"
        verbose_name_plural = "Цели"


class Inbox(models.Model):
    title = models.CharField("Название", max_length=255)
    user = models.ForeignKey(
        User,
        related_name="inboxes",
        on_delete=models.CASCADE,
        verbose_name="Пользователь"
    )
    description = models.TextField("Описание", blank=True, null=True)

    class Meta:
        verbose_name = "Входящая задача"
        verbose_name_plural = "Входящие задачи"


class Horizon(models.Model):
    title = models.CharField("Название", max_length=255)
    user = models.ForeignKey(
        User,
        related_name="horizons",
        on_delete=models.CASCADE,
        verbose_name="Пользователь"
    )
    description = models.TextField("Описание", blank=True, null=True)

    class Meta:
        verbose_name = "Горизонт"
        verbose_name_plural = "Горизонты"


class Task(models.Model):
    title = models.CharField("Название", max_length=255)
    user = models.ForeignKey(
        User, 
        verbose_name="Пользователь",
        related_name="tasks",
        on_delete=models.CASCADE
    )
    reference = models.ForeignKey(
        "self",
        verbose_name="Родитель",
        related_name="tasks",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    goals = models.ManyToManyField(
        Goal,
        verbose_name="Цели",
        related_name="tasks",
        null=True,
        blank=True
    )
    horizon = models.ForeignKey(
        Horizon,
        verbose_name="Горизонт",
        related_name="tasks",
        on_delete=models.CASCADE
    )
    is_done = models.BooleanField("Готова", default=False)
    description = models.TextField("Описание", blank=True, null=True)
    deadline = models.IntegerField("Дедлайн", blank=True, null=True)
    planned = models.BooleanField("Запалнировано", default=False)
    importance = models.FloatField("Важность", blank=True, default=0)
    urgency = models.FloatField("Срочность", blank=True, default=0)

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"
