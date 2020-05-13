from portfolio.models import Portfolio
from rest_framework import serializers


class PortfolioSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('id', 'name', 'portfolio_image', 'portfolio_description')