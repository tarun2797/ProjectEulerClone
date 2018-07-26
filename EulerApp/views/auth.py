from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.core.checks import messages
from django.shortcuts import render, redirect
from django.views import View

from EulerApp.forms import SignUpForm,LoginForm


@login_required
def home(request):
    return render(request, 'home.html')

class SignUpView(View):

    template_name = 'signup.html'
    form_class = SignUpForm

    def get(self,request):
        pass
        signup_form = SignUpForm()
        return render(request,template_name = 'signup.html',context={'signup_form':signup_form})
    

    def post(self, request, *args, **kwargs):
        pass
        form = SignUpForm(request.POST)
        #import ipdb
        #ipdb.set_trace()
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # load the profile instance created by the signal
            user.profile.birth_date = form.cleaned_data.get('birth_date')
            user.save()
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('/login/')
        else:
            form = SignUpForm()
        return render(request, 'signup.html', {'form': form})

class LoginView(View):
    pass
    template_name = 'login.html'
    form_class = LoginForm

    def get(self, request):
        pass
        login_form = LoginForm()
        return render(request, template_name='login.html', context={'login_form': login_form})

    def post(self, request):
        pass
        form = LoginForm(request.POST)
        # import ipdb
        # ipdb.set_trace()
        username = request.POST['username']
        password = request.POST['password']
        if form.is_valid():
            #user = User.objects.create_user(**form.cleaned_data)
            #user.save()
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request,user)
                return redirect('/my_account/questions/')
            else:
                messages.error(request, "Invalid Credentials")

def LogoutView(request):
    logout(request)
    return redirect('/login/')