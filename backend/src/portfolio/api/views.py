from rest_framework.generics import ListAPIView, RetrieveAPIView
from portfolio.models import Hero, Links, Email, Post
from portfolio.api.serializers import (
    HeroSerializerList, LinksSerializerList, PostSerializerList,
    PostSerializerRetrieve, EmailSerializerList)
from rest_framework.response import Response

from django.core.serializers import serialize
from django.utils import timezone

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
            server.login('rg.raulgavris@gmail.com', os.environ.get('EMAIL_PASSWORD'))
            message = 'Subject: {}\n\n{}'.format(str(request.data['subject']), request.data['email'] + "\n" + msg)
            server.sendmail('rg.raulgavris@gmail.com', 'rg.raulgavris@gmail.com', message)
            server.quit()
            print("Success: Email sent!")
        except:
            print("Email failed to send.")

        return Response()
