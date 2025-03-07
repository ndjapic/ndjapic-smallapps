for i in range(int(input())):
    datum, vreme = input().split('Z')[0].split('T')
    y, m, d = datum.split('-')
    datum = str(int(d)) + '. ' + str(int(m)) + '. ' + y[2:]
    h, m, s = vreme.split(':')
    vreme = str(int(h) + 2) + m
    print(datum + vreme)
