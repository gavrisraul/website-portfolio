from portfolio.models import Portfolio
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from portfolio.api.serializers import PortfolioSerializerList


class PortfolioListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializerList