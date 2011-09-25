def my_sort(a):
  LEFT = 0; HEAD = 1; RIGHT = 2

  def new_tree(): return []
  def is_empty(t): return len(t) < 3 # or < 1, whatever

  def put_value_to_tree(v,t):
    if(is_empty(t)):
      t.append(new_tree())
      t.append(v)
      t.append(new_tree())
    elif(v < t[HEAD]): put_value_to_tree(v,t[LEFT])
    else:              put_value_to_tree(v,t[RIGHT])

  def read_tree(t):
    if(not is_empty(t)):
      read_tree(t[LEFT])
      a[i] = t[HEAD]
      i += 1
      read_tree(t[RIGHT])

  tree = new_tree()
  for v in a: put_value_to_tree(v,tree)  
  i = 0
  read_tree(tree)