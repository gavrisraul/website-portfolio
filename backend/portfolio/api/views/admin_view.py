from portfolio.models import Email, Portfolio, Post
from rest_framework.generics import ListCreateAPIView
from rest_framework import permissions
from rest_framework.response import Response
from django.db import connection

from portfolio.api.serializers import (
    EmailSerializerList, PortfolioSerializerList, PostSerializerList
)


class EmailListViewAdmin(ListCreateAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Email.objects.all()
    serializer_class = EmailSerializerList

    def post(self, request, format=None):
        email_id_to_be_deleted = request.data['email_id']
        cursor = connection.cursor()
        cursor.execute(f"DELETE FROM website.email where id='{email_id_to_be_deleted}'")
        return Response(status=200, data={'success': 1, 'email_id_deleted': email_id_to_be_deleted})


class PortfolioListViewAdmin(ListCreateAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializerList

    def post(self, request, format=None):
        operation = request.data['operation']
        cursor = connection.cursor()
        if operation == 'delete':
            portfolio_id_to_be_deleted = request.data['portfolio_id']
            cursor.execute(f"DELETE FROM website.portfolio where id='{portfolio_id_to_be_deleted}'")
            return Response(status=200, data={'success': 1, 'portfolio_id_deleted': portfolio_id_to_be_deleted})
        elif operation == 'update':
            portfolio_id_to_be_updated = request.data['portfolio_id']
            portfolio_new_name = request.data.get('name', None)
            portfolio_new_image = request.data.get('image', None)
            portfolio_new_description = request.data.get('description', None)
            if portfolio_new_name:
                cursor.execute(f"UPDATE website.portfolio SET name='{portfolio_new_name}' where id='{portfolio_id_to_be_updated}'")
            if portfolio_new_image:
                cursor.execute(f"UPDATE website.portfolio SET portfolio_image='{portfolio_new_image}' where id='{portfolio_id_to_be_updated}'")
            if portfolio_new_description:
                cursor.execute(f"UPDATE website.portfolio SET portfolio_description='{portfolio_new_description}' where id='{portfolio_id_to_be_updated}'")
            
            return Response(status=200, data={'success': 1, 'portfolio_id_updated': portfolio_id_to_be_updated})


class PostListViewAdmin(ListCreateAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Post.objects.all()
    serializer_class = PostSerializerList


    def post(self, request, format=None):
        operation = request.data['operation']
        cursor = connection.cursor()
        if operation == 'delete':
            post_id_to_be_deleted = request.data['post_id']
            cursor.execute(f"DELETE FROM website.post where id='{post_id_to_be_deleted}'")
            return Response(status=200, data={'success': 1, 'post_id_deleted': post_id_to_be_deleted})
        elif operation == 'update':
            post_id_to_be_updated = request.data['post_id']
            post_new_title = request.data.get('title', None)
            post_new_text = request.data.get('text', None)
            post_new_image = request.data.get('image', None)
            post_new_date = request.data.get('date', None)
            post_new_likes = request.data.get('likes', None)
            if post_new_title:
                cursor.execute(f"UPDATE website.post SET title='{post_new_title}' where id='{post_id_to_be_updated}'")
            if post_new_text:
                cursor.execute(f"UPDATE website.post SET text='{post_new_text}' where id='{post_id_to_be_updated}'")
            if post_new_image:
                cursor.execute(f"UPDATE website.post SET image='{post_new_image}' where id='{post_id_to_be_updated}'")
            if post_new_date:
                cursor.execute(f"UPDATE website.post SET date='{post_new_date}' where id='{post_id_to_be_updated}'")
            if post_new_likes:
                cursor.execute(f"UPDATE website.post SET likes='{post_new_likes}' where id='{post_id_to_be_updated}'")

        return Response(status=200, data={'success': 1, 'post_id_updated': post_id_to_be_updated})


class DummyView(ListCreateAPIView):
    def get(self, request):
        return Response(status=200, data={'success': 1})