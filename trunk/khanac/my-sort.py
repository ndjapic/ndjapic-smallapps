def my-sort(a):
  LEFT = 0; HEAD = 1; RIGHT = 2
  
  def new-tree(): return []
  def not-empty(t): return t.length == 3
  
  def put-value-to-tree(v,t):
    if(not-empty(t)):
      if(v < t[HEAD]): put-value-to-tree(v,t[LEFT])
      else:            put-value-to-tree(v,t[RIGHT])
    else:
      t.append(new-tree())
      t.append(v)
      t.append(new-tree())

  def read-tree(t):
    if(not-empty(t)):
      read-tree(t[LEFT])
      a[i++] = t[HEAD]
      read-tree(t[RIGHT])
  
  tree = new-tree()
  for(v in a): put-value-to-tree(v,tree)  
  i = 0
  read-tree(tree)