from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from main_app.models import Horizon


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        h = []
        h.append(Horizon(title="Квант", user=instance))
        h.append(Horizon(title="День", user=instance))
        h.append(Horizon(title="Неделя", user=instance))
        h.append(Horizon(title="Месяц", user=instance))
        h.append(Horizon(title="Год", user=instance))

        Horizon.objects.bulk_create(h)
