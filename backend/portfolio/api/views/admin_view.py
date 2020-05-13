from portfolio.models import Email, Portfolio, Post
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from portfolio.api.serializers import (
    EmailSerializerList, PortfolioSerializerList, PostSerializerList
)


class EmailListViewAdmin(ListAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Email.objects.all()
    serializer_class = EmailSerializerList

class PortfolioListViewAdmin(ListAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializerList

class PostListViewAdmin(ListAPIView):
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = ()

    queryset = Post.objects.all()
    serializer_class = PostSerializerList