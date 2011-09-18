def my-sort(a):
  LEFT = 0; HEAD = 1; RIGHT = 2

  def new-tree(): return []
  def is-empty(t): return t.length < 3 # or < 1, whatever

  def put-value-to-tree(v,t):
    if(is-empty(t)):
      t.append(new-tree())
      t.append(v)
      t.append(new-tree())
    elif(v < t[HEAD]): put-value-to-tree(v,t[LEFT])
    else:              put-value-to-tree(v,t[RIGHT])

  def read-tree(t):
    if(not is-empty(t)):
      read-tree(t[LEFT])
      a[i] = t[HEAD]
      i += 1
      read-tree(t[RIGHT])

  tree = new-tree()
  for v in a: put-value-to-tree(v,tree)  
  i = 0
  read-tree(tree)