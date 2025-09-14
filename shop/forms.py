# shop/forms.py
from django import forms


class CheckoutForm(forms.Form):
full_name = forms.CharField(max_length=200)
address = forms.CharField(widget=forms.Textarea)
phone = forms.CharField(max_length=20)