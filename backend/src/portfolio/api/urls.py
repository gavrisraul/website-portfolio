from django.urls import path

from portfolio.api.views import (
    HeroListView, LinksListView, ArticleListView,
    ArticleRetrieveView, EmailListView
)


urlpatterns = [
    path('hero/', HeroListView.as_view()),
    path('article/', ArticleListView.as_view()),
    path('article/<pk>/', ArticleRetrieveView.as_view()),
    path('links/', LinksListView.as_view()),
    path('send_email', EmailListView.as_view()),
]