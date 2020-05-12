from django.contrib import admin

from portfolio.models import Hero, Links, Email, Post, CustomUser


admin.site.register(Hero)
admin.site.register(Links)
admin.site.register(Email)
admin.site.register(Post)
admin.site.register(CustomUser)