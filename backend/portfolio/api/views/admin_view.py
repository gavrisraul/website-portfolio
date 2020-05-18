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
            sql = f"DELETE FROM website.portfolio where id='{portfolio_id_to_be_deleted}'"
            cursor.execute(sql)
            
            return Response(status=200, data={'success': 1, 'portfolio_id_deleted': portfolio_id_to_be_deleted})
        elif operation == 'update':
            portfolio_id_to_be_updated = request.data['portfolio_id']
            portfolio_new_name = request.data.get('name', None)
            portfolio_new_image = request.data.get('image', None)
            portfolio_new_description = request.data.get('description', None)
            if portfolio_new_name:
                sql = f"UPDATE website.portfolio SET name='{portfolio_new_name}' where id='{portfolio_id_to_be_updated}'"
                cursor.execute(sql)
            if portfolio_new_image:
                sql = f"UPDATE website.portfolio SET portfolio_image='{portfolio_new_image}' where id='{portfolio_id_to_be_updated}'"
                cursor.execute(sql)
            if portfolio_new_description:
                sql = f"UPDATE website.portfolio SET portfolio_description='{portfolio_new_description}' where id='{portfolio_id_to_be_updated}'"
                cursor.execute(sql)
            
            return Response(status=200, data={'success': 1, 'portfolio_id_updated': portfolio_id_to_be_updated})
        elif operation == 'add':
            portfolio_id_to_be_added = request.data['portfolio_id']
            portfolio_new_name = request.data['name']
            portfolio_new_image = request.data['portfolio_image']
            portfolio_new_description = request.data['portfolio_description']
            sql = f"INSERT INTO website.portfolio VALUES ({portfolio_id_to_be_added}, '{portfolio_new_name}', '{portfolio_new_name}', '{portfolio_new_description}')"
            cursor.execute(sql)
            
            return Response(status=200, data={'success': 1, 'portfolio_id_added': portfolio_id_to_be_added})


class PostListViewAdmin(ListCreateAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Post.objects.all()
    serializer_class = PostSerializerList


    def rreplace(self, s, old, new, occurrence):
        li = s.rsplit(old, occurrence)
        return new.join(li)

    def post(self, request, format=None):
        operation = request.data['operation']
        cursor = connection.cursor()
        if operation == 'delete':
            post_id_to_be_deleted = request.data['post_id']
            sql = f"DELETE FROM website.post where id='{post_id_to_be_deleted}'"
            cursor.execute(sql)
            
            return Response(status=200, data={'success': 1, 'post_id_deleted': post_id_to_be_deleted})
        elif operation == 'update':
            post_id_to_be_updated = request.data['post_id']
            post_new_title = request.data.get('title', None)
            post_new_text = request.data.get('text', None)
            post_new_image = request.data.get('image', None)
            post_new_date = request.data.get('date', None)
            post_new_likes = request.data.get('likes', None)
            if post_new_title:
                sql = f"UPDATE website.post SET title='{post_new_title}' where id='{post_id_to_be_updated}'"
                cursor.execute(sql)
            if post_new_text:
                sql = f"UPDATE website.post SET text='{post_new_text}' where id='{post_id_to_be_updated}'"
                cursor.execute(sql)
            if post_new_image:
                sql = f"UPDATE website.post SET image='{post_new_image}' where id='{post_id_to_be_updated}'"
                cursor.execute(sql)
            if post_new_date:
                sql = f"UPDATE website.post SET date='{post_new_date}' where id='{post_id_to_be_updated}'"
                cursor.execute(sql)
            if post_new_likes:
                sql = f"UPDATE website.post SET likes='{post_new_likes}' where id='{post_id_to_be_updated}'"
                cursor.execute(sql)

            return Response(status=200, data={'success': 1, 'post_id_updated': post_id_to_be_updated})
        elif operation == 'add':
            cursor = connection.cursor()
            # import pudb; pu.db
            post_id_to_be_added = request.data['post_id']
            post_new_title = request.data['title']
            post_new_text = request.data['text']
            post_new_text = post_new_text.replace('"', '', 1)
            post_new_text = self.rreplace(post_new_text, '"', '', 1)
            post_new_image = request.data['image']
            post_new_date = request.data['date']
            post_new_likes = request.data['likes']
            sql = """INSERT INTO website.post VALUES (%s, %s, %s, %s, %s, %s)"""
            insert_tuple = (post_id_to_be_added, post_new_title, post_new_text, post_new_image, post_new_date, post_new_likes)
            cursor.execute(sql, insert_tuple)
            
            return Response(status=200, data={'success': 1, 'post_id_added': post_id_to_be_added})


class DummyView(ListCreateAPIView):
    def get(self, request):
        return Response(status=200, data={'success': 1})