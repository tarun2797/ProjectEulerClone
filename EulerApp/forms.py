from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User

from EulerApp.models import Question


class SignUpForm(UserCreationForm):

    birth_date = forms.DateField(help_text='Required. Format: YYYY-MM-DD')

    class Meta:
        model = User
        fields = ('username', 'birth_date', 'password1', 'password2')

class LoginForm(forms.Form):
    pass
    username = forms.CharField(label='UserName', widget=forms.TextInput)
    password = forms.CharField(label='PassWord', widget=forms.TextInput)


class AddQuestionForm(LoginRequiredMixin,forms.ModelForm):
    class Meta:
        model = Question
        exclude = ['id','difficulty','likes','dislikes']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.TextInput(attrs={'class': 'form-control'}),
            'answer': forms.TextInput(attrs={'class': 'form-control'}),
        }

'''
class SubmitAnswerForm(LoginRequiredMixin,forms.ModelForm):
    class Meta:
        model = Question
        exclude = ['id','difficulty','likes','dislikes','title','description']
        widgets = {
            'answer': forms.TextInput(attrs={'class': 'form-control'}),
        }
'''