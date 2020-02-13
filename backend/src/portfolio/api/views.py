from rest_framework.generics import ListAPIView, RetrieveAPIView
from portfolio.models import Hero, Links, Email, Article
from portfolio.api.serializers import (
    HeroSerializerList, LinksSerializerList, ArticleSerializerList,
    ArticleSerializerRetrieve, EmailSerializerList)
from rest_framework.response import Response

from django.core.serializers import serialize
from django.utils import timezone

import os
import pytz
import json
import requests
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class HeroListView(ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializerList


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializerList


class ArticleRetrieveView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializerRetrieve


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
        from_name = f'From Name: {str(request.data["name"])}<br />'
        msg = str(request.data["message"])
        msg = "\n".join([from_name, msg])
        message = Mail(
            from_email=str(request.data['email']),
            to_emails=str('rg.raulgavris@gmail.com'),
            subject=str(request.data['subject']),
            html_content=msg
        )
        try:
            # sg = SendGridAPIClient(os.environ.get('api_key'))
            sg = SendGridAPIClient('')
            response = sg.send(message)
        except Exception as e:
            print(e)

        return Response()
