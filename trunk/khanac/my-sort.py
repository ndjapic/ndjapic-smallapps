def my-sort(a):
  LEFT = 0; HEAD = 1; RIGHT = 2
  
  def new-node(): return []
  
  def put-value-to-tree(v,t):
    if(t.length == 3):
      if(v < t[HEAD]): put-value-to-tree(v,t[LEFT])
      else:            put-value-to-tree(v,t[RIGHT])
    else:
      t.append(new-node())
      t.append(v)
      t.append(new-node())

  def read-tree(t):
    if(t.length == 3):
      read-tree(t[LEFT])
      a[i++] = t[HEAD]
      read-tree(t[RIGHT])
  
  tree = newnode()
  for(v in a): put-value-to-tree(v,tree)  
  i = 0
  read-tree(tree)