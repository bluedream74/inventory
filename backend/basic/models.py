from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30, blank=True)
    image_url = models.ImageField(upload_to='images/')
    image_mode = models.CharField(max_length=30)
    part_number = models.CharField(max_length=30)
    ancient_time = models.CharField(max_length=30)
    price = models.FloatField(default=0)

    def __str__(self) -> str:
        return self.name

class Color(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name

class Size(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Season(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Brand(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)
    name_export = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Item(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Material(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Delivery(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Charger(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    
class Exhibition(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name
    
class Dealer(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)
    due_date = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    
class IncomingDepartment(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=30)
    due_date = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    
class OriginCountry(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name
    
class Storehouse(models.Model):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    
class Customer(models.Model):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

class Deposittype(models.Model):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.name