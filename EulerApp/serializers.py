from django.contrib.auth.models import User
from rest_framework import serializers
from EulerApp.models import Profile,Question


'''
It is used for signing up the users(Registration)
'''
class ProfileModelSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')
    #birth_date = serializers.DateField()
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ('id','username','password','email')

    '''
    This create method is invoked when serializer is saved in its view method.
    i.e inside serializer.is_valid() when serializer.save() is called this create method is invoked
    '''
    def create(self, validated_data):
        #print("In create --- data = ",validated_data)
        #print("being called")

        #extra_field = validated_data.pop('birth_date')

        #print("extra field = ",extra_field)
        #print("User fields = ",validated_data)
        #print("username = ",validated_data['user']['username'])

        username = validated_data['user']['username']
        password = validated_data['user']['password']
        email = validated_data['user']['email']

        user_obj = User.objects.create_user(username=username,password=password,email=email)

        profile_obj = Profile.objects.create(user=user_obj)

        #print("user obj = ",user_obj)

        return profile_obj

'''
It is used for viewing by others. So password is not included
'''
class TotalProfileModelSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username')
    #password = serializers.CharField(source='user.password')
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Profile
        fields = ('user','username','email','bio','location','birth_date','solved_qs')
'''
class UserModelSerializer(serializers.ModelSerializer):
    #profile = ProfileModelSerializer()
    class Meta:
        model = User
        fields = ('username','birth_date','password1','password2')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return Profile

    def update(self, instance, validated_data):
        print("validated data = ",validated_data)
        print("instance = ",instance)
        instance.bio = validated_data.get('bio',instance.bio)
        instance.location = validated_data.get('location',instance.location)
        instance.birth_date = validated_data.get('birth_date',instance.birth_date)
        instance.solved_qs = validated_data.get('solved_qs',instance.solved_qs)
        instance.save()
        return instance
'''

'''
It is for displaying questions without answer.
'''
class QuestionDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id','title','description','difficulty','likes','dislikes')
'''
It is for posting a question with answer and also for editing it.
'''
class QuestionModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('title','description','answer','difficulty','likes','dislikes')

    def create(self, validated_data):
        print("----- Into create of Question Model Serializer -----\n")
        print("Valid data = ",validated_data)
        question_obj = Question.objects.create(**validated_data)
        return question_obj

'''
It is used for viewing logged in user profile. 
It is individual account viewing and so password is included. It is just inclusion of password in TotalProfileModelSerializer
'''
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password','email')

class MyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ('user','bio', 'location', 'birth_date','solved_qs')

'''
It is for editing(updating) profile
'''
class MyProfileEditSerializer(serializers.ModelSerializer):

    #user = UserSerializer()
    '''
        if email is taken from user like above commented , it shows error that username and password is also required.
        so email field is taken individually as below
    '''
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Profile
        fields = ('email','bio', 'location', 'birth_date')

    def update(self, instance, validated_data):
        #print("Into update on saving from put method")
        #print("validated data = ",validated_data)
        user = validated_data.pop('user')
        #print("User mail = ",user['email'])

        #print("instance  = ",instance)
        #print("user object of instance = ",instance.user.id)
        user_obj = User.objects.get(id=instance.user.id)
        #print("user object ==> " ,user_obj.email)
        user_obj.email = user['email']
        user_obj.save()
        instance.bio = validated_data.get('bio', instance.bio)
        instance.location = validated_data.get('location', instance.location)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.save()
        return instance

