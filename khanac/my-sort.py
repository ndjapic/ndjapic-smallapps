def my_sort(a):
  LEFT = 0; HEAD = 1; RIGHT = 2

  def new_tree(): return []
  def is_empty(t): return len(t) < 1

  def put_value_to_tree(v,t):
    if(is_empty(t)):   t += [new_tree(), v, new_tree()]
    elif(v < t[HEAD]): put_value_to_tree(v,t[LEFT])
    else:              put_value_to_tree(v,t[RIGHT])

  i = 0
  def read_tree(t):
    if(not is_empty(t)):
      read_tree(t[LEFT])
      a[i] = t[HEAD] # it says here that local var i is used before inited
      i += 1
      read_tree(t[RIGHT])

  tree = new_tree()
  for v in a: put_value_to_tree(v,tree)  
  read_tree(tree)

my_sort([3,5,2,7,8,1,6,5,3])
