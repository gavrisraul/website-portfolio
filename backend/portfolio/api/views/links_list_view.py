from portfolio.models import Links
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from portfolio.api.serializers import LinksSerializerList


class LinksListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    queryset = Links.objects.all()
    serializer_class = LinksSerializerList