from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
import pymysql
from CS.models import *
import random


# Create your views here.

class Regview(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        id = data['uid']
        data_list = User.objects.filter(uid=id)
        if len(data_list) == 0:
            User.objects.create(uid=data['uid'], username=data['username'], password=data['password'],
                                identity=data['identity'])
            return Response({"status": True})
        else:
            return Response({"status": False})


class Loginview(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        id = data['uid']
        identity = data['identity']
        data_list = User.objects.filter(uid=id, identity=identity)

        if len(data_list) == 0:
            return Response({"status": 0})
        else:
            if data['password'] == data_list[0].password:
                return Response({"status": 1})
            else:
                return Response({"status": 2})


class Searchview(APIView):
    def post(self, request, *args, **kwargs):
        queryset = Course.objects.all()

        filter_fields = {}
        for field in Course._meta.fields:
            parm = request.data.get(field.name, None)
            if parm:
                filter_fields[field.name] = parm

        queryset = queryset.filter(**filter_fields)

        ret = []
        if len(queryset) != 0:
            for i in queryset:
                json_dict = {}
                json_dict['cid'] = i.cid
                json_dict['cname'] = i.cname
                json_dict['xf'] = i.xf
                json_dict['time'] = i.time
                json_dict['teacher'] = i.teacher
                json_dict['volumn'] = i.volumn
                ret.append(json_dict)
        else:
            return Response({'status': False})

        return JsonResponse(ret, safe=False)


class Selectview(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        courseid = data['cid']
        userid = data['uid']

        data_list = List.objects.filter(uid=userid, cid=courseid)

        if len(data_list) != 0:
            return Response({'status': 0})

        data_list = Course.objects.filter(cid=courseid)
        v = data_list[0].volumn
        if v == 0:
            return Response({'status': 2})
        else:
            Course.objects.filter(cid=courseid).update(volumn=v - 1)
            data_list = Course.objects.filter(cid=courseid)
            cname = data_list[0].cname
            List.objects.create(uid=userid, cid=courseid, cname=cname)
            return Response({'status': 1})


class Csonloadview(APIView):
    def post(selfs, request, *args, **kwargs):
        courseid = request.data['cid']
        data = Course.objects.filter(cid=courseid)
        ret = []

        json_dict = {}
        json_dict['time'] = data[0].time
        json_dict['xf'] = data[0].xf
        json_dict['teacher'] = data[0].teacher
        json_dict['desc'] = data[0].desc
        json_dict['cname'] = data[0].cname
        ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class getMyCoursesview(APIView):
    def post(selfs, request, *args, **kwargs):
        userid = request.data['userid']
        data_list = List.objects.filter(uid=userid)

        ret = []
        for i in data_list:
            ret.append(i.cid)

        return JsonResponse(ret, safe=False)


class addMyCoursesview(APIView):
    def post(selfs, request, *args, **kwargs):
        courseid = request.data['cids']

        ret = []
        for i in courseid:
            data_list = Course.objects.filter(cid=i)
            json_dict = {}
            json_dict['cname'] = data_list[0].cname
            json_dict['xf'] = data_list[0].xf
            json_dict['time'] = data_list[0].time
            json_dict['teacher'] = data_list[0].teacher
            json_dict['volumn'] = data_list[0].volumn
            json_dict['cid'] = data_list[0].cid
            ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class quitview(APIView):
    def post(selfs, request, *args, **kwargs):
        userid = request.data['userid']
        courseid = request.data['courseid']
        print(courseid)
        List.objects.filter(uid=userid, cid=courseid).delete()
        data_list = Course.objects.filter(cid=courseid)
        v = data_list[0].volumn
        Course.objects.filter(cid=courseid).update(volumn=v + 1)

        return Response({'status': True})


class Openview(APIView):
    def post(selfs, request, *args, **kwargs):
        cid = random.randint(10000000, 999999999)
        cid = str(cid)
        cname = request.data['cname']
        xf = request.data['xf']
        time = request.data['time']
        desc = request.data['desc']
        teacher = request.data['teacher']
        volumn = request.data['volumn']
        tid = request.data['tid']
        Course.objects.create(cid=cid, cname=cname, xf=xf, time=time, teacher=teacher, desc=desc, volumn=volumn,
                              tid=tid)
        return Response({'status': True})


class showScoreview(APIView):
    def post(selfs, request, *args, **kwargs):
        uid = request.data['userid']
        data_list = List.objects.filter(uid=uid)
        ret = []
        for i in data_list:
            json_dict = {}
            json_dict['cid'] = i.cid
            json_dict['cname'] = i.cname
            json_dict['score'] = i.score
            ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class myTeachview(APIView):
    def post(selfs, request, *args, **kwargs):
        uid = request.data['userid']
        data_list = Course.objects.filter(tid=uid)
        ret = []
        for i in data_list:
            json_dict = {}
            json_dict['cid'] = i.cid
            json_dict['cname'] = i.cname
            json_dict['volumn'] = i.volumn
            json_dict['teacher'] = i.teacher
            ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class deleteview(APIView):
    def post(selfs, request, *args, **kwargs):
        cid = request.data['cid']
        Course.objects.filter(cid=cid).delete()
        List.objects.filter(cid=cid).delete()

        return Response({'status': True})


class type_inview(APIView):
    def post(selfs, request, *args, **kwargs):
        cid = request.data['cid']
        data_list = List.objects.filter(cid=cid)
        ret = []
        for i in data_list:
            json_dict = {}
            json_dict['uid'] = i.uid
            json_dict['username'] = i.username
            json_dict['score'] = i.score

            ret.append(json_dict)
        print(ret)
        return JsonResponse(ret, safe=False)


class submitview(APIView):
    def post(selfs, request, *args, **kwargs):
        print(request.data)
        data_list = request.data['students']
        print(data_list[0])
        cid = request.data['courseid']
        for i in data_list:
            List.objects.filter(uid=i['uid'], cid=cid).update(score=i['score'])

        return Response({'status': True})
