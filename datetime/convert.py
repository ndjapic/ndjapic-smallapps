from sys import stdin

for line in stdin:
    datum, vreme = line.split('Z')[0].split('T')
    y, m, d = datum.split('-')
    datum = '.'.join([str(int(d)), str(int(m)), y[2:], ' '])
    h, m, s = vreme.split(':')
    vreme = ':'.join([str(int(h) + 2), m])
    print(datum + vreme)
