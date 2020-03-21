from portfolio.models import Links
from rest_framework.generics import ListAPIView
from portfolio.api.serializers import LinksSerializerList


class LinksListView(ListAPIView):
    queryset = Links.objects.all()
    serializer_class = LinksSerializerList