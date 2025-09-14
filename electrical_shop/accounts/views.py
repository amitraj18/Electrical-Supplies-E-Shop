# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages




def register(request):
if request.method == 'POST':
username = request.POST.get('username')
email = request.POST.get('email')
password = request.POST.get('password')
if User.objects.filter(username=username).exists():
messages.error(request, 'Username already exists')
return redirect('register')
user = User.objects.create_user(username=username, email=email, password=password)
login(request, user)
return redirect('product_list')
return render(request, 'accounts/register.html')




def login_user(request):
if request.method == 'POST':
username = request.POST.get('username')
password = request.POST.get('password')
user = authenticate(request, username=username, password=password)
if user:
login(request, user)
return redirect('product_list')
else:
messages.error(request, 'Invalid credentials')
return render(request, 'accounts/login.html')




def logout_user(request):
logout(request)
return redirect('product_list')