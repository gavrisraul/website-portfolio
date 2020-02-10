from django.urls import path

from portfolio.api.views import (
    HeroListView, HeroRetrieveView, LinksListView,
    EmailListView
)


urlpatterns = [
    path('hero/', HeroListView.as_view()),
    path('hero/<pk>/', HeroRetrieveView.as_view()),
    path('links/', LinksListView.as_view()),
    path('send_email', EmailListView.as_view()),
]