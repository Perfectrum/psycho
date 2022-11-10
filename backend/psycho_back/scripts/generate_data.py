import random
from main_app.models import Goal, Inbox, Horizon, Task
from django.contrib.auth.models import User


def create():
    for i in range(10):
        User.objects.filter(username=f"user {i}").delete()

    for i in range(10):

        u = User(username=f"user {i}", email=f"user{i}@gmail.ru")
        u.set_password("123Asdfg")
        u.save()

    inboxes = []
    goals = []
    tasks = []

    users = User.objects.all()
    for user in users:
        for i in range(8):
            goals.append(Goal(title=f"goal {i}", user=user))
        for i in range(10):
            inboxes.append(Inbox(title=f"inbox {i}", user=user))
    Inbox.objects.bulk_create(inboxes)
    Goal.objects.bulk_create(goals)

    states = ["todo", "progress", "goals"]
    for user in users:

        horizons = Horizon.objects.filter(user=user)
        for i in range(16):
            t = Task(
                title=f"task {i}",
                user=user,
                horizon=random.choice(horizons),
                state=random.choice(states),
                description=f"task {i} description",
                importance=random.random(),
                urgency=random.random()
            )
            tasks.append(t)
        Task.objects.bulk_create(tasks)

        goals = Goal.objects.filter(user=user)
        for task in Task.objects.filter(user=user):
            r_val = random.randint(0, 3)
            for i in range(r_val):
                task.goals.add(random.choice(goals))
