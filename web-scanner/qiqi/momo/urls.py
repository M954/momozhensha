# from django.urls import url
from django.conf.urls import  url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^get_elements_from_db$', views.get_elements_from_db, name='get_elements_from_db'),
]
