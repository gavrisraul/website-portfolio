from portfolio.models import Hero
from rest_framework import serializers


class HeroSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = (
            'id', 'name', 'surname', 'hero_image', 'hero_profession',
            'hero_description', 'resume_label', 'trademarks')