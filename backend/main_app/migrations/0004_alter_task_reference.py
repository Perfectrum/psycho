# Generated by Django 3.2.10 on 2022-11-10 13:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0003_auto_20221110_1248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='reference',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tasks', to='main_app.task', verbose_name='Родитель'),
        ),
    ]
