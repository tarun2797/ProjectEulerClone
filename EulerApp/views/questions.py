from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.views.generic import DetailView,ListView,CreateView,UpdateView,DeleteView

from EulerApp.forms import AddQuestionForm
from EulerApp.views import *
from EulerApp.models import *
from django.shortcuts import render, get_object_or_404
from django import forms
from django.urls import reverse_lazy
from django.shortcuts import *
import json

class QuestionsView(LoginRequiredMixin,View):
    login_url = '/login/'
    def get(self,request,*args,**kwargs):
        #import ipdb
        #ipdb.set_trace()
        questions = Question.objects.values('id','title','difficulty')
        context={
            'question_details':questions
        }
        return render(
            request,
            template_name = 'questions_display.html',
            context=context,
        )

class AddQuestionView(LoginRequiredMixin,CreateView):
    login_url = '/login/'
    model = Question
    template_name = 'add_question.html'
    form_class = AddQuestionForm

    def get_context_data(self,**kwargs):

        context = super(AddQuestionView, self).get_context_data(**kwargs)
        context.update({
            'add_question_form': context.get('form'),
        })
        return context

    def post(self, request, *args, **kwargs):
        #COLLEGE = get_object_or_404(college, pk=kwargs.get('pk'))
        question_form = AddQuestionForm(request.POST)

        if question_form.is_valid():

            question = question_form.save(commit=False)
            # print("student = ",student)
            #student.college = COLLEGE
            question.difficulty = 0
            question.likes = 0
            question.dislikes = 0
            question.save()

        return redirect('/my_account/questions/')

class SubmitAnswerView(LoginRequiredMixin,View):
    login_url = '/login/'

    '''
    here i have not created any form like that of SignUpForm and LoginForm in onlineapp but 
    just using html form element , collected the input present in answer field.
    We can also do it by creating a form and modifying post method in this.
    '''
    def get(self,request,*args,**kwargs):
        #context = super(SubmitAnswerView, self).get_context_data(**kwargs)
        print("testing kwargs = ",kwargs)
        #import ipdb
        #ipdb.set_trace()
        question = Question.objects.get(pk=kwargs.get('pk'))

        context = {
            'question_details': question
        }
        return render(
            request,
            template_name='submit_answer.html',
            context=context,
        )

    def post(self, request, *args, **kwargs):
        #print("testing kwargs = ",kwargs)
        data = request.POST
        data_dict = dict(data)
        user_answer = data_dict['user answer'][0]  #'user answer' is the name given to input text in submit_answer.html

        logged_user = self.request.user.id
        user_profile = Profile.objects.get(user_id=logged_user)

        question_id = kwargs['pk']

        question_obj = Question.objects.get(id=question_id)
        actual_answer = question_obj.answer

        #print("user submitted answer  = ",user_answer)
        #print("user  = ",self.request.user.id)
        #print("user solved qs = ",user_profile.solved_qs)
        #print("question id = ",kwargs['pk'])

        if user_profile.solved_qs=='':
            user_profile.solved_qs='[]'
            user_profile.save()
            print("Initialised to an empty list")

        if user_answer==actual_answer:
            python_str = user_profile.solved_qs
            python_obj = json.loads(python_str)
            python_obj += [question_id]
            python_str = json.dumps(python_obj)
            user_profile.solved_qs = python_str
            user_profile.save()
            question_obj.difficulty += 1
            question_obj.save()
            #print("user object = ", user_profile.solved_qs)
            #return redirect('/my_account/questions/')
            return render_to_response('display_status.html',{'message':'CONGRATS!!!  SUCCESSFULLY SOLVED'})
        else:
            #return redirect('/my_account/questions/')
            return render_to_response('display_status.html', {'message':'OOPS!!!  TRY AGAIN'})

