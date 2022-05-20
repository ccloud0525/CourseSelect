"""CourseSelect URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from CS import views

urlpatterns = [
    url(r'^Reg/', views.Regview.as_view()),
    url(r'^Login/', views.Loginview.as_view()),
    url(r'^Search/', views.Searchview.as_view()),
    url(r'^Select/', views.Selectview.as_view()),
    url(r'^Csonload/', views.Csonloadview.as_view()),
    url(r'^getMyCourses/', views.getMyCoursesview.as_view()),
    url(r'^quit/', views.quitview.as_view()),
    url(r'^Open/', views.Openview.as_view()),
    url(r'^showScore/', views.showScoreview.as_view()),
    url(r'^myTeach/', views.myTeachview.as_view()),
    url(r'^delete/', views.deleteview.as_view()),
    url(r'^type_in/', views.type_inview.as_view()),
    url(r'^submit/', views.submitview.as_view()),
    url(r'^adOpen/', views.Openview.as_view()),
    url(r'^change/', views.changeview.as_view()),
    url(r'^update/', views.updateview.as_view()),
    url(r'^usersearch/', views.usersearchview.as_view()),
    url(r'^userdelete/', views.userdeleteview.as_view()),
    url(r'^pagesearch/', views.pagesearchview.as_view()),

]
