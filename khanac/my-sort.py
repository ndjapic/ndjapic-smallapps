import random

def my_sort(a):
  LEFT = 0; HEAD = 1; RIGHT = 2

  def put_value_to_tree(v, t):
    if len(t) < 1:    t.extend([[], v, []])
    elif v < t[HEAD]: put_value_to_tree(v, t[LEFT])
    else:             put_value_to_tree(v, t[RIGHT])

  def read_tree(t):
    if len(t) > 0:
      read_tree(t[LEFT])
      a.append(t[HEAD])
      read_tree(t[RIGHT])

  tree = []
  while len(a) > 0:
    put_value_to_tree(
      a.pop(random.randint(0, len(a)-1)),
      tree
    )
  # print tree
  read_tree(tree)

a = [3,5,2,7,8,1,6,5,3]
print a
my_sort(a)
print a