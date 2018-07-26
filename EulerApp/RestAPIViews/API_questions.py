from django.http import JsonResponse, Http404
import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from EulerApp.models import *
from EulerApp.serializers import *

from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import AllowAny

@authentication_classes([])
@permission_classes([])
class UserProfilesAPIView(APIView):

    def get(self,request,format=None):
        users = Profile.objects.all()
        serialized_users = TotalProfileModelSerializer(users,many=True)
        return Response(serialized_users.data)

    def post(self, request, format=None):
        serializer = ProfileModelSerializer(data=request.data)
        print("data = ", request.data)
        #print("serializer = ",serializer)
        if serializer.is_valid():
            #print("data = ",dict(serializer.validated_data))
            serializer.save()
            return Response(serializer.data)
        return serializer.errors


class MyProfileAPIView(APIView):

    def get(self,request,format=None):
        logged_in_user = self.request.user.id
        user_obj = Profile.objects.get(user=logged_in_user)
        serialized_user = MyProfileSerializer(user_obj)
        return Response(serialized_user.data)

    def put(self,request,format=None):
        logged_in_user = self.request.user.id
        user_data = self.request.data
        user_obj = Profile.objects.get(user=logged_in_user)
        print("update data = ",user_data)
        print("user obj = ",user_obj)
        serializer = MyProfileEditSerializer(user_obj,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
        #return Response({"let":"tarun"})

class QuestionsAPIView(APIView):

    def get(self,request,format=None):
        questions = Question.objects.all()
        serialized_questions = QuestionDisplaySerializer(questions,many=True)
        print(serialized_questions.data)
        return Response(serialized_questions.data)

    def post(self,request,format=None):
        print("posted data = ",request.data)
        serializer = QuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return serializer.errors

class IndividualQuestionAPIView(APIView):

    def get(self,request,pk,format=None):
        print("question id = ",pk)
        question_obj = Question.objects.get(id=pk)
        serialized_question = QuestionDisplaySerializer(question_obj)
        return Response(serialized_question.data)

    def post(self,request,pk,format=None):
        #print("request data = ",request.data)
        #print("question id = ",pk)
        #print("logged in user = ",self.request.user.id)
        logged_in_user = self.request.user.id
        question_obj = Question.objects.get(id=pk)
        user_obj = Profile.objects.get(user=logged_in_user)
        user_answer = request.data['answer']
        actual_answer = question_obj.answer
        print("actual answer , user answer = ",actual_answer,user_answer)
        if user_answer==actual_answer:
            if user_obj.solved_qs == '':
                user_obj.solved_qs = '[]'
                user_obj.save()
                print("Initialised to an empty list")

            python_str = user_obj.solved_qs
            python_obj = json.loads(python_str)
            python_obj += [pk]
            python_str = json.dumps(python_obj)
            user_obj.solved_qs = python_str
            user_obj.save()
            question_obj.difficulty += 1
            question_obj.save()

            return Response({"status":"CONGRATS!!! YOU HAVE SOLVED IT SUCCESSFULLY"})
        #print("solved qs = ", user_obj.solved_qs)
        return Response({"status":"OOPS!!! WRONG ANSWER ... TRY AGAIN"})