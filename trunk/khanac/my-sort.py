def my_sort(a):
  LEFT, HEAD, RIGHT, i = 0, 1, 2, 0

  def put_value_to_tree(v, t):
    if len(t) < 1:   t.extend([[], v, []])
    elif v < t[HEAD]: put_value_to_tree(v, t[LEFT])
    else:             put_value_to_tree(v, t[RIGHT])

  def read_tree(t):
    if len(t) > 0:
      read_tree(t[LEFT])
      a[i], i = t[HEAD], i+1 # it says here that local var i is used before inited
      read_tree(t[RIGHT])

  tree = []
  for v in a: put_value_to_tree(v, tree)
  read_tree(tree)

my_sort([3,5,2,7,8,1,6,5,3])
