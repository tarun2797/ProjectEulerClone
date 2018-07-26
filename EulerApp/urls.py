from django.contrib import admin
from django.urls import path

#from EulerApp.API_views import *

from EulerApp.RestAPIViews.API_questions import UserProfilesAPIView, QuestionsAPIView, IndividualQuestionAPIView, \
    MyProfileAPIView
from EulerApp.views.auth import *
from EulerApp.views.questions import *
from django.conf import settings
from django.conf.urls import include, url


app_name = "EulerApp"

'''
    url(r'^$', core_views.home, name='home'),
    url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': 'login'}, name='logout'),
    url(r'^signup/$', core_views.signup, name='signup'),
'''

urlpatterns = [
    path('signup/',SignUpView.as_view(),name="sign_up"),
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView,name='logout'),
    path('home/',home,name='home'),
    path('my_account/questions/',QuestionsView.as_view(),name='questions_display'),
    path('my_account/add_question/',AddQuestionView.as_view(),name='add_question'),
    path('my_account/questions/<int:pk>/',SubmitAnswerView.as_view(),name='submit_answer'),
    path('my_account/api/users/',UserProfilesAPIView.as_view(),name='api_users_display'),
    path('my_account/api/my_profile/',MyProfileAPIView.as_view(),name='my_profile'),
    path('my_account/api/questions/',QuestionsAPIView.as_view(),name='api_questions_display'),
    path('my_account/api/questions/<int:pk>/',IndividualQuestionAPIView.as_view(),name='api_individual_question_display')
]
