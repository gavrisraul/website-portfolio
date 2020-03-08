from rest_framework.generics import ListAPIView, RetrieveAPIView
from portfolio.models import Hero, Links, Email, Post, PostLikes
from portfolio.api.serializers import (
    HeroSerializerList, LinksSerializerList, PostSerializerList,
    PostSerializerRetrieve, EmailSerializerList)
from rest_framework.response import Response

from django.core.serializers import serialize
from django.utils import timezone
from django.db import connection

import os
import pytz
import json
import requests


class HeroListView(ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializerList


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializerList


class PostRetrieveView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializerRetrieve


    def post(self, request, pk):
        client_ip = requests.get('https://jsonip.com')
        client_ip = json.loads(client_ip.text)['ip']

        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM website.portfolio_postlikes where post_liked='{pk}' and client_ip='{client_ip}'")
        row = cursor.fetchone()

        if not row:
            post = Post.objects.get(id=pk)
            likes = request.data['likes']
            post.likes = likes
            post.save()

            cursor.execute(f"INSERT INTO website.portfolio_postlikes (post_liked, client_ip) values('{pk}', '{client_ip}')")

            data = {'succes': 1}

            return Response(data)
        else:
            data = {'failed': 1, 'message': 'You already liked this article'}
            return Response(data, status=210)



class LinksListView(ListAPIView):
    queryset = Links.objects.all()
    serializer_class = LinksSerializerList


class EmailListView(ListAPIView):
    queryset = Email.objects.all()
    serializer_class = EmailSerializerList
    email = Email()

    def get(self, request, format=None):
        client_ip = requests.get('https://jsonip.com')
        client_ip = json.loads(client_ip.text)['ip']
        return Response(serialize(
            'json',
            self.get_queryset().filter(client_ip=client_ip), fields=(
                'client_ip', 'email', 'count', 'date_send')))

    def post(self, request):
        self.email.name = request.data['name']
        self.email.subject = request.data['subject']
        self.email.email = request.data['email']
        self.email.message = request.data['message']
        self.email.client_ip = request.data['client_ip']
        self.email.count = request.data['count']
        self.email.date_send = timezone.now()
        if self.email.email:
            try:
                self.email.save()
            except Exception:
                self.email.update(active=True)
        from_name = f'From Name: {str(request.data["name"])}'
        msg = str(request.data["message"])
        msg = "\n".join([from_name, msg])
        import smtplib

        try:
            server = smtplib.SMTP('smtp.gmail.com:587')
            server.ehlo()
            server.starttls()
            server.login(os.environ.get('EMAIL'), os.environ.get('EMAIL_PASSWORD'))
            message = 'Subject: {}\n\n{}'.format(str(request.data['subject']), request.data['email'] + "\n" + msg)
            server.sendmail(os.environ.get('EMAIL'), os.environ.get('EMAIL'), message)
            server.quit()
            print("Success: Email sent!")
        except:
            print("Email failed to send.")

        return Response()
