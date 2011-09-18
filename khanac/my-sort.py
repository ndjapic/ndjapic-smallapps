def my-sort(a):
  LEFT = 0
  HEAD = 1
  RIGHT = 2
  tree = []
  for(x in a):
    parent = []
    node = tree
    while(node.length == 3):
      parent = node
      if(x < parent[HEAD]):
        node = parent[LEFT]
      else:
        node = parent[RIGHT]
    node = [ [], x, [] ]
# this will not work