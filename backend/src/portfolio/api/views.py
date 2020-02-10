from rest_framework.generics import ListAPIView, RetrieveAPIView
from portfolio.models import Hero, Links, Email
from portfolio.api.serializers import (
    HeroSerializerList, HeroSerializerRetrieve, LinksSerializerList,
    EmailSerializerList)
from rest_framework.response import Response


class HeroListView(ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializerList


class HeroRetrieveView(RetrieveAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializerRetrieve


class LinksListView(ListAPIView):
    queryset = Links.objects.all()
    serializer_class = LinksSerializerList


class EmailListView(ListAPIView):
    queryset = Email.objects.all()
    serializer_class = EmailSerializerList

    def get(self, request, format=None):
        return Response()

    def post(self, request):
        import os
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail
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
            sg = SendGridAPIClient('api_key')
            response = sg.send(message)
        except Exception as e:
            print(e.message)
        
        return Response()
