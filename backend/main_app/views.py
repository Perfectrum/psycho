from .models import Inbox, Goal, Task
from .serializers import (
    InboxSerializer,
    TaskSerializer,
    GoalSerializer,
    InboxPatchSerializer,
    TaskUpdateSerializer,
    TaskCreateSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny


class InboxCreateAPIView(APIView):

    def post(self, request):
        serializer = InboxSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InboxDeleteAPIView(APIView):

    def get_object(self, pk):
        return get_object_or_404(Inbox, id=pk)

    def post(self, request, pk):
        inbox = self.get_object(pk)
        inbox.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class InboxPatchAPIView(APIView):

    def get_object(self, pk):
        return get_object_or_404(Inbox, id=pk)

    def patch(self, request, pk):
        inbox = self.get_object(pk)
        serializer = InboxPatchSerializer(inbox, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InboxListAPIView(APIView):

    def get(self, request):
        inboxes = Inbox.objects.filter(user=request.user)
        serializer = InboxSerializer(inboxes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskCreateAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = TaskCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskListAPIView(APIView):

    def get(self, request):
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GoalCreateAPIView(APIView):

    def post(self, request):
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoalListView(APIView):

    def get(self, request):
        goals = Goal.objects.filter(user=request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GoalDeleteApiView(APIView):

    def get_object(self, pk):
        return get_object_or_404(Goal, id=pk)

    def post(self, request, pk):
        goal = self.get_object(pk)
        goal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GoalUpdateInformationAPIView(APIView):

    def get_object(self, pk):
        return get_object_or_404(Goal, id=pk)

    def patch(self, request, pk):
        goal = self.get_object(pk)
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            goal.update(data=serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class TaskUpdateAPIView(APIView):

    def get_object(self, pk):
        return get_object_or_404(Task, id=pk)

    def patch(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskUpdateSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
