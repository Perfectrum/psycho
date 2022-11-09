from .models import Inbox
from .serializers import InboxSerializer, InboxPatchSerializer, TaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404


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

    def delete(self, request, pk):
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


class CreateTaskAPIView(APIView):

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # go to the page where card is placed

    # get table with created card

