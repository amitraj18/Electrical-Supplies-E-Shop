from django.shortcuts import render, get_object_or_404
from .models import Product, Category

def product_list(request):
    category_slug = request.GET.get("category")
    products = Product.objects.all()
    if category_slug:
        products = products.filter(category__slug=category_slug)
    categories = Category.objects.all()
    return render(request, "shop/product_list.html", {"products": products, "categories": categories})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, "shop/product_detail.html", {"product": product})
