from portfolio.models import Hero
from rest_framework.generics import ListAPIView
from portfolio.api.serializers import HeroSerializerList


class HeroListView(ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializerList