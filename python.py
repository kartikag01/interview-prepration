## Fucntion

```
def greet(name, age): 
    print(f"Hello {name}, you are {age} years old.") 

1.  greet(age = 25, name= "Alice") 
2.  greet("Alice", 25)
```

```
def greetV2(*args, **kwargs):
    print(args, kwargs)

3. greetV2(("Alice", 25))
4. greetV2({ "name": "Alice", "age": 25))

are 1, 2,3,4 are all  correct ?
```
