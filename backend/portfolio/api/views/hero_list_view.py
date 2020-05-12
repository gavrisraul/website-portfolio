from portfolio.models import Hero
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from portfolio.api.serializers import HeroSerializerList


class HeroListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    queryset = Hero.objects.all()
    serializer_class = HeroSerializerList