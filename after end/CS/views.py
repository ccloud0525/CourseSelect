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
                json_dict['xq'] = i.xq
                json_dict['time'] = i.time
                json_dict['teacher'] = i.teacher
                json_dict['tid'] = i.taid
                json_dict['address'] = i.address
                json_dict['desc'] = i.desc
                json_dict['volumn'] = i.volumn
                json_dict['num'] = str(i.num)
                ret.append(json_dict)
        else:
            return Response({'status': False})
        print(ret)
        return JsonResponse(ret, safe=False)


class Selectview(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        courseid = data['cid']
        userid = data['uid']
        tid = data['tid']
        xq = data['xq']
        name = User.objects.filter(uid=userid)
        data_list = List.objects.filter(uid=userid, cid=courseid, taid=tid, xq=xq)

        if len(data_list) != 0:
            return Response({'status': 0})

        data_list = Course.objects.filter(cid=courseid, taid=tid, xq=xq)
        data = List.objects.filter(cid=courseid, taid=tid, xq=xq)
        v = data_list[0].volumn
        if v == 0:
            s = Score.objects.filter(cid=courseid, uid=userid)
            if len(s) != 0 and s[0].score < 60:
                sum = 0
                minuid = userid
                min = GPA.objects.filter(uid=minuid)[0].gpa
                for i in data:
                    p = Score.objects.filter(uid=i.uid, cid=courseid)  # 查询是否选过该课且挂课
                    k = GPA.objects.filter(uid=i.uid)  # 查均绩，比较
                    if len(p) != 0 and p[0].score < 60:
                        sum = sum + 1
                    if k[0].gpa < min and (len(p) == 0 or (len(p) != 0 and p[0].score >= 60)):
                        min = k[0].gpa
                        minuid = k[0].uid

                if sum >= 5 and minuid == userid:
                    return Response({'status': 2})
                elif sum >= 5 and minuid != userid:
                    List.objects.filter(uid=minuid, cid=courseid, taid=tid, xq=xq).delete()
                    cname = data_list[0].cname
                    List.objects.create(uid=userid, cid=courseid, cname=cname, taid=tid, xq=xq,
                                        username=name[0].username)
                elif sum < 5:
                    List.objects.filter(uid=minuid, cid=courseid, taid=tid, xq=xq).delete()
                    cname = data_list[0].cname
                    List.objects.create(uid=userid, cid=courseid, cname=cname, taid=tid, xq=xq,
                                        username=name[0].username)
                    return Response({'status': 1})
            else:
                sum = 0
                minuid = userid
                min = GPA.objects.filter(uid=minuid)[0].gpa
                for i in data:
                    p = Score.objects.filter(uid=i.uid, cid=courseid)  # 查询是否选过该课且挂课
                    k = GPA.objects.filter(uid=i.uid)  # 查均绩，比较
                    if len(p) != 0 and p[0].score < 60:
                        sum = sum + 1
                    if k[0].gpa < min and (len(p) == 0 or (len(p) != 0 and p[0].score >= 60)):
                        min = k[0].gpa
                        minuid = k[0].uid

                if minuid == userid:
                    return Response({'status': 2})

                else:
                    List.objects.filter(uid=minuid, cid=courseid, taid=tid, xq=xq).delete()
                    cname = data_list[0].cname
                    List.objects.create(uid=userid, cid=courseid, cname=cname, taid=tid, xq=xq,
                                        username=name[0].username)
                    return Response({'status': 1})

        else:
            data_list.update(volumn=v - 1)
            cname = data_list[0].cname
            List.objects.create(uid=userid, cid=courseid, cname=cname, taid=tid, xq=xq, username=name[0].username)
            return Response({'status': 1})


class Csonloadview(APIView):
    def post(selfs, request, *args, **kwargs):
        courseid = request.data['cid']
        xq = request.data['xq']
        tid = request.data['tid']
        data = Course.objects.filter(cid=courseid, taid=tid, xq=xq)
        ret = []

        json_dict = {}
        json_dict['time'] = data[0].time
        json_dict['xf'] = data[0].xf
        json_dict['teacher'] = data[0].teacher
        json_dict['tid'] = data[0].taid
        json_dict['desc'] = data[0].desc
        json_dict['cname'] = data[0].cname
        json_dict['address'] = data[0].address
        json_dict['xq'] = data[0].xq
        ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class getMyCoursesview(APIView):
    def post(selfs, request, *args, **kwargs):
        userid = request.data['userid']
        course_list = List.objects.filter(uid=userid)

        ret = []
        for i in course_list:
            data_list = Course.objects.filter(cid=i.cid, taid=i.taid, xq=i.xq)
            json_dict = {}
            json_dict['cname'] = data_list[0].cname
            json_dict['xf'] = data_list[0].xf
            json_dict['time'] = data_list[0].time
            json_dict['xq'] = data_list[0].xq
            json_dict['teacher'] = data_list[0].teacher
            json_dict['address'] = data_list[0].address
            json_dict['volumn'] = data_list[0].volumn
            json_dict['tid'] = data_list[0].taid
            json_dict['num'] = data_list[0].num
            json_dict['cid'] = data_list[0].cid
            ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class quitview(APIView):
    def post(selfs, request, *args, **kwargs):
        userid = request.data['userid']
        courseid = request.data['courseid']
        tid = request.data['tid']
        xq = request.data['xq']
        print(courseid)
        List.objects.filter(uid=userid, cid=courseid, taid=tid, xq=xq).delete()
        data_list = Course.objects.filter(cid=courseid, taid=tid, xq=xq)
        v = data_list[0].volumn
        data_list.update(volumn=v + 1)

        return Response({'status': True})


class Openview(APIView):
    def post(selfs, request, *args, **kwargs):
        # cid = random.randint(10000000, 999999999)
        # cid = str(cid)
        cid = request.data['cid']
        xq = request.data['xq']
        time = request.data['time']
        address = request.data['address']
        desc = request.data['desc']

        volumn = request.data['volumn']
        tid = request.data['tid']
        uquery = User.objects.filter(uid=tid)
        if len(uquery) == 0:
            return Response({'status': -1})

        cquery = CourseTemplate.objects.filter(cid=cid, xq=xq)
        if len(cquery) == 0:
            return Response({'status': 0})

        csquery = Course.objects.filter(cid=cid, xq=xq, taid=tid, time=time, address=address)
        if len(csquery) != 0:
            return Response({'status': -2})

        cname = cquery[0].cname
        xf = cquery[0].xf
        query = User.objects.filter(uid=tid)
        teacher = query[0].username

        Course.objects.create(cid=cid, cname=cname, xf=xf, xq=xq, time=time, address=address, teacher=teacher,
                              desc=desc,
                              num=volumn,
                              volumn=volumn,
                              taid=tid)
        return Response({'status': 1})


class showScoreview(APIView):
    def post(selfs, request, *args, **kwargs):
        uid = request.data['userid']
        data_list = Score.objects.filter(uid=uid)
        ret = []
        for i in data_list:
            json_dict = {}
            json_dict = {}
            json_dict['cid'] = i.cid
            json_dict['cname'] = i.cname
            json_dict['score'] = i.score
            json_dict['grade'] = i.grade
            ret.append(json_dict)
        print(ret)
        return JsonResponse(ret, safe=False)


class myTeachview(APIView):
    def post(selfs, request, *args, **kwargs):
        uid = request.data['userid']
        data_list = Course.objects.filter(taid=uid)
        ret = []
        for i in data_list:
            json_dict = {}
            json_dict['cid'] = i.cid
            json_dict['cname'] = i.cname
            json_dict['volumn'] = i.volumn
            json_dict['teacher'] = i.teacher
            json_dict['time'] = i.time
            json_dict['xq'] = i.xq
            json_dict['address'] = i.address

            json_dict['xf'] = i.xf
            ret.append(json_dict)

        return JsonResponse(ret, safe=False)


class deleteview(APIView):
    def post(selfs, request, *args, **kwargs):
        print(request.data)
        cid = request.data['cid']
        tid = request.data['tid']
        xq = request.data['xq']
        Course.objects.filter(cid=cid, taid=tid, xq=xq).delete()
        List.objects.filter(cid=cid, taid=tid, xq=xq).delete()

        return Response({'status': True})





class submitview(APIView):
    def post(selfs, request, *args, **kwargs):
        print(request.data)
        data_list = request.data['students']
        print(data_list[0])
        cid = request.data['courseid']
        tid = request.data['tid']
        xq = request.data['xq']

        for i in data_list:
            List.objects.filter(uid=i['uid'], cid=cid, taid=tid, xq=xq).update(score=i['score'])

        inf = Course.objects.filter(cid=cid, xq=xq, taid=tid)
        for i in data_list:
            print(int(i['score']))
            score = int(i['score'])
            if score >= 90:
                grade = 4.0
            elif 85 <= score < 90:
                grade = 3.7
            elif 82 <= score < 85:
                grade = 3.3
            elif 79 <= score < 82:
                grade = 3.0
            elif 76 <= score < 79:
                grade = 2.7
            elif 73 <= score < 76:
                grade = 2.3
            elif 70 <= score < 73:
                grade = 2.0
            elif 67 <= score < 70:
                grade = 1.7
            elif 64 <= score < 67:
                grade = 1.3
            elif 60 <= score < 64:
                grade = 1.0
            else:
                grade = 0.0

            query = sScore.objects.filter(uid=i['uid'], cid=cid, taid=tid, xq=xq)
            cname = inf[0].cname
            xf = inf[0].xf
            if len(query) == 0:
                username = User.objects.filter(uid=i['uid'])[0].username
                sScore.objects.create(cid=cid, cname=cname, uid=i['uid'], username=username, xq=xq, taid=tid,
                                      score=i['score'],
                                      xf=xf,
                                      grade=grade)
            else:
                query.update(score=i['score'], grade=grade)

            # query = Score.objects.filter(uid=i['uid'], cid=cid)
            # cname = inf[0].cname
            # xf = inf[0].xf
            # if len(query) == 0:
            #     username = User.objects.filter(uid=i['uid'])[0].username
            #     Score.objects.create(cid=cid, cname=cname, uid=i['uid'], username=username, score=i['score'],
            #                          xf=xf,
            #                          grade=grade)
            # else:
            #     query.update(score=i['score'], grade=grade)

        return Response({'status': True})


class changeview(APIView):
    def post(selfs, request, *args, **kwargs):
        print(request.data)
        cid = request.data['cid']
        cname = request.data['cname']
        xf = request.data['xf']
        time = request.data['time']
        desc = request.data['desc']
        xq = request.data['xq']
        address = request.data['address']
        otid = request.data['otid']
        volumn = int(request.data['volumn'])
        tid = request.data['tid']

        query = User.objects.filter(uid=tid)
        if len(query) == 0:
            return Response({'status': False})
        else:
            n = Course.objects.filter(cid=cid, taid=otid, xq=xq)[0].num
            v = Course.objects.filter(cid=cid, taid=otid, xq=xq)[0].volumn

            Course.objects.filter(cid=cid).update(cname=cname, xf=xf, xq=xq, time=time, desc=desc,
                                                  volumn=v + volumn - n,
                                                  num=volumn,
                                                  address=address,
                                                  taid=tid)
            return Response({'status': True})


class updateview(APIView):
    def post(selfs, request, *args, **kwargs):
        query = sScore.objects.all()
        for i in query:
            Query = Score.objects.filter(cid=i.cid, uid=i.uid)
            if len(Query) != 0:
                if Query[0].score < 60:
                    Query.update(score=i.score, repeat=True, grade=i.grade)
                else:
                    Query.update(score=i.score, repeat=False, grade=i.grade)
            else:
                Score.objects.create(cid=i.cid, repeat=False, cname=i.cname, uid=i.uid, username=i.username,
                                     score=i.score, xf=i.xf, grade=i.grade)

        students = User.objects.filter(identity='student')
        for i in students:
            uid = i.uid
            scores = sScore.objects.filter(uid=uid)
            sum = 0
            txf = 0
            for j in scores:
                xf = int(j.xf)
                grade = float(j.grade)
                sum = sum + xf * grade
                txf = txf + xf

                Q = sGPA.objects.filter(uid=j.uid, xq=j.xq)
                if len(Q) == 0:
                    sGPA.objects.create(uid=j.uid, username=j.username, txf=xf, gpa=grade, xq=j.xq)
                else:
                    sxf = int(Q[0].txf)
                    sgpa = float(Q[0].gpa)
                    s = sxf * sgpa + xf * grade
                    ngpa = s / (sxf + xf)
                    Q.update(txf=sxf + xf, gpa=ngpa)

            if txf != 0:
                gpa = sum / txf
            else:
                gpa = 0

            inf = GPA.objects.filter(uid=uid)
            if len(inf) == 0:
                GPA.objects.create(uid=uid, username=i.username, txf=str(txf), gpa=gpa)
            else:
                GPA.objects.filter(uid=uid).update(txf=str(txf), gpa=gpa)
        return Response({'status': True})


class usersearchview(APIView):
    def post(selfs, request, *args, **kwargs):
        queryset = User.objects.all()

        filter_fields = {}
        for field in User._meta.fields:
            parm = request.data.get(field.name, None)
            if parm:
                filter_fields[field.name] = parm

        queryset = queryset.filter(**filter_fields)

        ret = []
        if len(queryset) != 0:
            for i in queryset:
                json_dict = {}
                json_dict['uid'] = i.uid
                json_dict['username'] = i.username
                json_dict['identity'] = i.identity
                ret.append(json_dict)
        else:
            return Response({'status': False})

        return JsonResponse(ret, safe=False)


class userdeleteview(APIView):
    def post(selfs, request, *args, **kwargs):
        queryset = User.objects.all()

        filter_fields = {}
        for field in User._meta.fields:
            parm = request.data.get(field.name, None)
            if parm:
                filter_fields[field.name] = parm

        queryset = queryset.filter(**filter_fields)

        ret = []
        if len(queryset) != 0:
            for i in queryset:
                if i.identity == 'student':
                    User.objects.filter(uid=i.uid).delete()
                    query = List.objects.filter(uid=i.uid)
                    if len(query) != 0:
                        for j in query:
                            v = int(Course.objects.filter(cid=j.cid)[0].volumn)
                            Course.objects.filter(cid=j.cid).update(volumn=v + 1)

                    GPA.objects.filter(uid=i.uid).delete()
                    Score.objects.filter(uid=i.uid).delete()

                elif i.identity == 'teacher':
                    User.objects.filter(uid=i.uid).delete()
                    query = Course.objects.filter(uid=i.uid)
                    if len(query) != 0:
                        query.update(uid=0000000, username="空缺")
        else:
            return Response({'status': False})

        return JsonResponse(ret, safe=False)


class pagesearchview(APIView):
    def post(selfs, request, *args, **kwargs):
        print(request.data)
        page = int(request.data['_page'])
        limit = int(request.data['_limit'])
        cid = request.data['_cid']
        tid = request.data['_tid']
        xq = request.data['_xq']

        data_list = List.objects.filter(cid=cid, xq=xq, taid=tid)
        print(data_list)
        ret = []
        if len(data_list) >= page * limit:
            for i in data_list[(page - 1) * limit:page * limit]:
                json_dict = {}
                json_dict['uid'] = i.uid
                json_dict['username'] = i.username

                ret.append(json_dict)
            print(ret)
            return JsonResponse(ret, safe=False)
        else:
            for i in data_list[(page - 1) * limit:]:
                json_dict = {}
                json_dict['uid'] = i.uid
                json_dict['username'] = i.username

                ret.append(json_dict)
            print(ret)
            return JsonResponse(ret, safe=False)


class tsearchview(APIView):
    def post(selfs, request, *args, **kwargs):
        queryset = CourseTemplate.objects.all()

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
                json_dict['xq'] = i.xq
                ret.append(json_dict)
        else:
            return Response({'status': False})

        return JsonResponse(ret, safe=False)


class admakeview(APIView):
    def post(selfs, request, *args, **kwargs):
        cid = request.data['cid']
        cname = request.data['cname']
        xf = request.data['xf']
        xq = request.data['xq']

        query = CourseTemplate.objects.filter(cid=cid, xq=xq)
        if len(query) != 0:
            return Response({'status': False})

        CourseTemplate.objects.create(cid=cid, cname=cname, xq=xq, xf=xf)
        return Response({'status': True})


class tdeleteview(APIView):
    def post(selfs, request, *args, **kwargs):
        cid = request.data['cid']
        xq = request.data['xq']
        CourseTemplate.objects.filter(cid=cid, xq=xq).delete()

        return Response({'status': True})


class showsgpaview(APIView):
    def post(selfs, request, *args, **kwargs):
        uid = request.data['userid']
        data_list = sGPA.objects.filter(uid=uid)
        ret = []
        for i in data_list:
            json_dict = {}
            json_dict['semester'] = i.xq
            json_dict['credit'] = i.txf
            json_dict['grade'] = str(i.gpa)
            ret.append(json_dict)
        print(ret)
        return JsonResponse(ret, safe=False)


class showrankview(APIView):
    def post(selfs, request, *args, **kwargs):
        uid = request.data['userid']
        data = GPA.objects.filter(uid=uid)
        gpa = data[0].gpa

        data_list = GPA.objects.all()
        num = len(data_list)
        rank = 1
        for i in data_list:
            if gpa < i.gpa:
                rank = rank + 1

        ret = []
        json_dict = {}
        json_dict['rank'] = str(rank)
        json_dict['total'] = str(num)
        ret.append(json_dict)
        print(ret)

        return JsonResponse(ret, safe=False)


class grademanageview(APIView):
    def post(self, request, *args, **kwargs):
        queryset = sScore.objects.all()

        filter_fields = {}
        for field in sScore._meta.fields:
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
                json_dict['xq'] = i.xq
                json_dict['tid'] = i.taid
                json_dict['uid'] = i.uid
                json_dict['username'] = i.username
                json_dict['score'] = i.score
                json_dict['xf'] = i.xf
                ret.append(json_dict)
        else:
            return Response({'status': False})
        print(ret)
        return JsonResponse(ret, safe=False)


class changescoreview(APIView):
    def post(selfs, request, *args, **kwargs):
        print(request.data)
        ss = request.data['ss']
        for j in ss:
            cid = j['cid']
            tid = j['tid']
            xq = j['xq']
            uid = j['uid']
            score = int(j['score'])

            List.objects.filter(uid=uid, cid=cid, taid=tid, xq=xq).update(score=score)

            inf = Course.objects.filter(cid=cid, taid=tid, xq=xq)

            if score >= 90:
                grade = 4.0
            elif 85 <= score < 90:
                grade = 3.7
            elif 82 <= score < 85:
                grade = 3.3
            elif 79 <= score < 82:
                grade = 3.0
            elif 76 <= score < 79:
                grade = 2.7
            elif 73 <= score < 76:
                grade = 2.3
            elif 70 <= score < 73:
                grade = 2.0
            elif 67 <= score < 70:
                grade = 1.7
            elif 64 <= score < 67:
                grade = 1.3
            elif 60 <= score < 64:
                grade = 1.0
            else:
                grade = 0.0

            query = sScore.objects.filter(uid=uid, cid=cid, taid=tid, xq=xq)
            cname = inf[0].cname
            xf = inf[0].xf
            if len(query) == 0:
                username = User.objects.filter(uid=uid)[0].username
                sScore.objects.create(cid=cid, cname=cname, uid=uid, username=username, xq=xq, taid=tid,
                                      score=score,
                                      xf=xf,
                                      grade=grade)
            else:
                query.update(score=score, grade=grade)

            # query = Score.objects.filter(uid=i['uid'], cid=cid)
            # cname = inf[0].cname
            # xf = inf[0].xf
            # if len(query) == 0:
            #     username = User.objects.filter(uid=i['uid'])[0].username
            #     Score.objects.create(cid=cid, cname=cname, uid=i['uid'], username=username, score=i['score'],
            #                          xf=xf,
            #                          grade=grade)
            # else:
            #     query.update(score=i['score'], grade=grade)

        return Response({'status': True})
