# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from momo.models import *
import json


def index(request):
    return render(request, 'index.html')

# def get_elements_from_db(request):
#     runoob=list(RunoobTbl.objects.values('runoob_title', 'runoob_author', 'submission_date'))
#     print(runoob)
#     elements = dict(runoob=runoob)
#     return JsonResponse(elements)

def get_dir(dict_data, path_list):
    if len(path_list) <= 0:
        return dict_data
    tmp = dict_data.get(path_list[0], {})
    # print '[before]\t' + path_list[0] + '\t' + str(tmp)
    dict_data[path_list[0]] = get_dir(tmp, path_list[1:])
    # print '[after  ]\t' + path_list[0] + '\t' + str(dict_data[path_list[0]])
    # print path_list[0] + '[before]\t' + str(tmp) + '[after  ]\t' + str(dict_data[path_list[0]])
    return dict_data

def get_elements_from_db(request):
    curl = list(crawl_urls.objects.values('url'))
    print curl
    ret_val = {}
    for i in curl:
        print i
        tmp_url = i['url'].split('/')
        level1 = '/'.join(tmp_url[0:3])
        ret_val[level1] = get_dir(ret_val.get(level1, {}), tmp_url[3:])
    print(ret_val)
    return JsonResponse(ret_val)
